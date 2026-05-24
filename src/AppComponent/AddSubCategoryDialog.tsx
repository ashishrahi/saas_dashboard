"use client";

import { useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import { XCircle, Edit3, FolderPlus, Eye } from "lucide-react";
import { ActiveStatusBadge } from "@/components/design-system/status-badge";

import type { ISubCategory } from "@/types/ISubCategory";
import { useAddSubCategory } from "@/hooks/useSubCategory/useAddSubCategory";
import { useUpdateSubCategory } from "@/hooks/useSubCategory/useUpdateSubCategory";
import { useCategories } from "@/hooks/useCategory/useCategories";

interface AddSubCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  subCategoryToEdit?: ISubCategory;
  viewMode?: boolean;
}

interface SubCategoryFormData {
  name: string;
  description?: string;
  categoryId: string;
  isActive: boolean;
}

export function AddSubCategoryDialog({
  isOpen,
  onClose,
  subCategoryToEdit,
  viewMode = false,
}: AddSubCategoryDialogProps) {
  const { mutate: addSubCategory, isPending: isAdding } = useAddSubCategory();
  const { mutate: updateSubCategory, isPending: isUpdating } =
    useUpdateSubCategory();

  // Load active categories for dropdown
  const { categories, isLoading: isLoadingCategories } = useCategories({
    isActive: true,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SubCategoryFormData>({
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      isActive: true,
    },
  });

  const isActive = watch("isActive");

  useEffect(() => {
    if (!isOpen) {
      reset({
        name: "",
        description: "",
        categoryId: "",
        isActive: true,
      });
      return;
    }

    if (subCategoryToEdit) {
      const categoryIdValue =
        typeof subCategoryToEdit.categoryId === "object" &&
        subCategoryToEdit.categoryId
          ? subCategoryToEdit.categoryId._id
          : (subCategoryToEdit.categoryId as string) || "";
      reset({
        name: subCategoryToEdit.name ?? "",
        description: subCategoryToEdit.description ?? "",
        categoryId: categoryIdValue,
        isActive: subCategoryToEdit.isActive,
      });
    }
  }, [isOpen, subCategoryToEdit, reset]);

  const onSubmit = (data: SubCategoryFormData) => {
    if (viewMode) return;

    if (subCategoryToEdit) {
      const payload: ISubCategory = {
        ...subCategoryToEdit,
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        isActive: data.isActive,
        updatedAt: new Date(),
      };

      updateSubCategory(payload, {
        onSuccess: () => {
          onClose();
        },
      });
    } else {
      const payload: Omit<ISubCategory, "_id"> = {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        isActive: data.isActive,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      addSubCategory(payload, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="border-divider border-b pb-4">
          <DialogTitle className="flex items-center gap-2">
            {subCategoryToEdit ? (
              <>
                {viewMode ? (
                  <Eye size={20} className="text-primary" />
                ) : (
                  <Edit3 size={20} className="text-primary" />
                )}
                {viewMode ? "View Subcategory" : "Edit Subcategory"}
              </>
            ) : (
              <>
                <FolderPlus size={20} className="text-primary" />
                Add Subcategory
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
        >
          <div className="space-y-2 md:col-span-2">
            <Label>Subcategory Name *</Label>
            <Input
              placeholder="Enter subcategory name"
              {...register("name", {
                required: "Subcategory name is required",
              })}
              disabled={viewMode}
            />
            {errors.name && (
              <p className="text-destructive text-xs">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Category *</Label>
            <select
              {...register("categoryId", {
                required: "Category is required",
              })}
              disabled={viewMode || isLoadingCategories}
              className="border-input bg-surface text-heading focus-visible:border-primary h-11 w-full rounded-[10px] border px-4 py-2 text-sm shadow-card focus-visible:ring-[3px] focus-visible:ring-ring outline-none"
            >
              <option value="">Select category...</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-destructive text-xs">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Subcategory description..."
              {...register("description")}
              className="resize-none h-24"
              disabled={viewMode}
            />
          </div>

          <div className="flex items-center justify-between md:col-span-2 pt-2">
            <Label>Active Status</Label>
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

          <DialogFooter className="border-divider md:col-span-2 flex justify-end gap-3 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isAdding || isUpdating}
            >
              <XCircle size={16} className="mr-1" />{" "}
              {viewMode ? "Close" : "Cancel"}
            </Button>

            {!viewMode && (
              <Button type="submit" disabled={isAdding || isUpdating}>
                {subCategoryToEdit
                  ? isUpdating
                    ? "Updating..."
                    : "Update Subcategory"
                  : isAdding
                  ? "Adding..."
                  : "Add Subcategory"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

