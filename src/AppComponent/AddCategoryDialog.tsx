"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { XCircle, Edit3, FolderPlus, Eye } from "lucide-react";
import { FormDialog } from "@/components/design-system/form-dialog";
import { FormField } from "@/components/design-system/form-field";
import { ActiveStatusBadge } from "@/components/design-system/status-badge";

import type { ICategory } from "@/types/ICategory";
import { useAddCategory } from "@/hooks/useCategory/useAddCategory";
import { useUpdateCategory } from "@/hooks/useCategory/useUpdateCategory";

interface AddCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit?: ICategory;
  viewMode?: boolean;
}

interface CategoryFormData {
  name: string;
  description?: string;
  isActive: boolean;
}

export function AddCategoryDialog({
  isOpen,
  onClose,
  categoryToEdit,
  viewMode = false,
}: AddCategoryDialogProps) {
  const { mutate: addCategory, isPending: isAdding } = useAddCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
    },
  });

  const isActive = watch("isActive");

  useEffect(() => {
    if (!isOpen) {
      reset({
        name: "",
        description: "",
        isActive: true,
      });
      return;
    }

    if (categoryToEdit) {
      reset({
        name: categoryToEdit.name ?? "",
        description: categoryToEdit.description ?? "",
        isActive: categoryToEdit.isActive,
      });
    }
  }, [isOpen, categoryToEdit, reset]);

  const onSubmit = (data: CategoryFormData) => {
    if (viewMode) return;

    if (categoryToEdit) {
      const payload: ICategory = {
        ...categoryToEdit,
        name: data.name,
        description: data.description,
        isActive: data.isActive,
        updatedAt: new Date(),
      };

      updateCategory(payload, {
        onSuccess: () => {
          onClose();
        },
      });
    } else {
      const payload: Omit<ICategory, "_id"> = {
        name: data.name,
        description: data.description,
        isActive: data.isActive,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      addCategory(payload, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const title = categoryToEdit
    ? viewMode
      ? "View Category"
      : "Edit Category"
    : "Add Category";

  const icon = categoryToEdit ? (
    viewMode ? (
      <Eye size={20} />
    ) : (
      <Edit3 size={20} />
    )
  ) : (
    <FolderPlus size={20} />
  );

  return (
    <FormDialog
      open={isOpen}
      onOpenChange={onClose}
      title={title}
      icon={icon}
      onSubmit={handleSubmit(onSubmit)}
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isAdding || isUpdating}
          >
            <XCircle size={16} className="mr-1" />
            {viewMode ? "Close" : "Cancel"}
          </Button>
          {!viewMode && (
            <Button type="submit" disabled={isAdding || isUpdating}>
              {categoryToEdit
                ? isUpdating
                  ? "Updating..."
                  : "Update Category"
                : isAdding
                  ? "Adding..."
                  : "Add Category"}
            </Button>
          )}
        </>
      }
    >
      <FormField
        label="Category Name"
        required
        error={errors.name?.message}
        className="md:col-span-2"
      >
        <Input
          placeholder="Enter category name"
          {...register("name", { required: "Category name is required" })}
          disabled={viewMode}
        />
      </FormField>

      <FormField label="Description" className="md:col-span-2">
        <Textarea
          placeholder="Category description..."
          {...register("description")}
          className="h-24 resize-none"
          disabled={viewMode}
        />
      </FormField>

      <div className="flex items-center justify-between md:col-span-2 pt-2">
        <span className="text-heading text-sm font-medium">Active Status</span>
        <div className="flex items-center gap-2">
          <ActiveStatusBadge isActive={isActive} size="sm" />
          <Switch
            checked={isActive}
            onCheckedChange={(val) =>
              setValue("isActive", Boolean(val), { shouldDirty: true })
            }
            disabled={viewMode}
          />
        </div>
      </div>
    </FormDialog>
  );
}
