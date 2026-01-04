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

import { XCircle, Tag, Edit3 } from "lucide-react";

import type { IFeature } from "@/types/IFeatures";

interface AddFeatureDialogProps {
  isOpen: boolean;
  onClose: () => void;
  featureToEdit?: IFeature;
}

interface FeatureFormData {
  title: string;
  description?: string;
}

export function AddFeatureDialog({
  isOpen,
  onClose,
  featureToEdit,
}: AddFeatureDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeatureFormData>();

  const resetForm = useCallback(() => {
    reset({ title: "", description: "" });
  }, [reset]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
      return;
    }

    if (featureToEdit) {
      reset({
        title: featureToEdit?.title ?? "",
        description: featureToEdit?.description ?? "",
      });
    } else {
      resetForm();
    }
  }, [isOpen, featureToEdit, reset, resetForm]);

  const onSubmit = (data: FeatureFormData) => {
    console.log("Form submitted:", data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[80vh] overflow-y-auto">
        <DialogHeader className="border-b py-3">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            {featureToEdit ? (
              <>
                <Edit3 size={20} className="text-blue-600" />
                Edit Feature
              </>
            ) : (
              <>
                <Tag size={20} className="text-blue-600" />
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
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Description..."
              {...register("description")}
              className="resize-none h-24"
            />
          </div>

          {/* Actions */}
          <DialogFooter className="md:col-span-2 flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              <XCircle size={16} /> Cancel
            </Button>

            <Button type="submit">
              {featureToEdit ? "Update Feature" : "Add Feature"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
