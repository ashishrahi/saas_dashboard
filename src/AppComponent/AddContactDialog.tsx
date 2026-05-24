"use client";

import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { XCircle, UserPlus, Edit3, Eye } from "lucide-react";

import type { IContact } from "@/types/IContact";
import { useAddContact } from "@/hooks/useContact/useAddContact";
import { useUpdateContact } from "@/hooks/useContact/useUpdateContact";

interface AddContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contactToEdit?: IContact;
  viewMode?: boolean; // view-only
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export function AddContactDialog({
  isOpen,
  onClose,
  contactToEdit,
  viewMode = false,
}: AddContactDialogProps) {
  const { mutate: addContact, isPending: isAdding } = useAddContact();
  const { mutate: updateContact, isPending: isUpdating } = useUpdateContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const resetForm = useCallback(() => {
    reset({ name: "", email: "", phone: "", subject: "", message: "" });
  }, [reset]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
      return;
    }

    if (contactToEdit) {
      reset({
        name: contactToEdit.name,
        email: contactToEdit.email,
        phone: contactToEdit.phone ?? "",
        subject: contactToEdit.subject ?? "",
        message: contactToEdit.message,
      });
    } else {
      resetForm();
    }
  }, [isOpen, contactToEdit, reset, resetForm]);

  const onSubmit = (data: ContactFormData) => {
    if (viewMode) return; // view-only does nothing

    if (contactToEdit) {
      const payload: IContact = {
        ...contactToEdit,
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        updatedAt: new Date(),
      };

      updateContact(payload, {
        onSuccess: () => {
          onClose();
          resetForm();
        },
      });
    } else {
      const payload: Omit<IContact, "_id"> = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        isRead: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      addContact(payload, {
        onSuccess: () => {
          onClose();
          resetForm();
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="border-divider border-b pb-4">
          <DialogTitle className="flex items-center gap-2">
            {contactToEdit ? (
              <>
                {viewMode ? <Eye size={20} className="text-primary" /> : <Edit3 size={20} className="text-primary" />}
                {viewMode ? "View Contact" : "Edit Contact"}
              </>
            ) : (
              <>
                <UserPlus size={20} className="text-primary" />
                Add Contact
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              placeholder="Full Name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              })}
              disabled={viewMode}
            />
            {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              disabled={viewMode}
            />
            {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Phone number"
              {...register("phone")}
              disabled={viewMode}
            />
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Subject"
              {...register("subject")}
              disabled={viewMode}
            />
          </div>

          {/* Message */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Message..."
              {...register("message", { required: "Message is required" })}
              className="resize-none h-24"
              disabled={viewMode}
            />
            {errors.message && <p className="text-destructive text-xs">{errors.message.message}</p>}
          </div>

          {/* Actions */}
          <DialogFooter className="border-divider md:col-span-2 flex justify-end gap-3 border-t pt-4">
            <Button variant="outline" onClick={onClose} disabled={isAdding || isUpdating}>
              <XCircle size={16} /> {viewMode ? "Close" : "Cancel"}
            </Button>

            {!viewMode && (
              <Button type="submit" disabled={isAdding || isUpdating}>
                {contactToEdit
                  ? isUpdating
                    ? "Updating..."
                    : "Update Contact"
                  : isAdding
                  ? "Adding..."
                  : "Add Contact"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}