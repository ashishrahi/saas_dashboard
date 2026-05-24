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
import { XCircle, Tag, Edit3, Eye } from "lucide-react";

import type { IFeature } from "@/types/IFeatures";
import { useAddFeature } from "@/hooks/useFeatures/useAddFeatures";
import { useUpdateFeature } from "@/hooks/useFeatures/useUpdateFeature";

interface AddFeatureDialogProps {
  isOpen: boolean;
  onClose: () => void;
  featureToEdit?: IFeature;
  viewMode?: boolean; 
}

interface FeatureFormData {
  title: string;
  description?: string;
}

export function AddFeatureDialog({
  isOpen,
  onClose,
  featureToEdit,
  viewMode = false,
}: AddFeatureDialogProps) {
  // React Query mutations
  const { mutate: addFeature, isPending: isAdding } = useAddFeature();
  const { mutate: updateFeature, isPending: isUpdating } = useUpdateFeature();

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeatureFormData>();

  // Reset form
  const resetForm = useCallback(() => {
    reset({ title: "", description: "" });
  }, [reset]);

  // Populate form when editing, viewing, or when dialog opens
  useEffect(() => {
    if (!isOpen) {
      resetForm();
      return;
    }

    if (featureToEdit) {
      reset({
        title: featureToEdit.title ?? "",
        description: featureToEdit.description ?? "",
      });
    } else {
      resetForm();
    }
  }, [isOpen, featureToEdit, reset, resetForm]);

  // Submit handler
  const onSubmit = (data: FeatureFormData) => {
    if (viewMode) return; 

    if (featureToEdit) {
      // Edit existing feature
      const payload: IFeature = {
        ...featureToEdit,
        title: data.title,
        description: data.description ?? "",
        updatedAt: new Date(),
      };

      updateFeature(payload, {
        onSuccess: () => {
          onClose();
          resetForm();
        },
      });
    } else {
      // Add new feature
      const payload: Omit<IFeature, "_id"> = {
        title: data.title,
        description: data.description ?? "",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      addFeature(payload, {
        onSuccess: () => {
          onClose();
          resetForm();
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="border-divider border-b pb-4">
          <DialogTitle className="flex items-center gap-2">
            {featureToEdit ? (
              <>
                {viewMode ? <Eye size={20} className="text-primary" /> : <Edit3 size={20} className="text-primary" />}
                {viewMode ? "View Feature" : "Edit Feature"}
              </>
            ) : (
              <>
                <Tag size={20} className="text-primary" />
                Add Feature
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
        >
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Feature Title *</Label>
            <Input
              id="title"
              placeholder="Feature title"
              {...register("title", {
                required: "Feature title is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              })}
              disabled={viewMode} // ✅ readonly in view
            />
            {errors.title && (
              <p className="text-destructive text-xs">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Description..."
              {...register("description")}
              className="resize-none h-24"
              disabled={viewMode} // ✅ readonly in view
            />
          </div>

          {/* Actions */}
          <DialogFooter className="border-divider md:col-span-2 flex justify-end gap-3 border-t pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isAdding || isUpdating}
            >
              <XCircle size={16} /> {viewMode ? "Close" : "Cancel"}
            </Button>

            {!viewMode && (
              <Button type="submit" disabled={isAdding || isUpdating}>
                {featureToEdit
                  ? isUpdating
                    ? "Updating..."
                    : "Update Feature"
                  : isAdding
                  ? "Adding..."
                  : "Add Feature"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}