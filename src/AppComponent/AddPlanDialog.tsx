"use client";

import { useEffect, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { XCircle, Edit3, Package, Eye } from "lucide-react";

import type { IPlan, CreatePlanPayload } from "@/types/IPlan";
import { useAddPlan } from "@/hooks/usePlan/useAddPlan";
import { useUpdatePlan } from "@/hooks/usePlan/useUpdatePlan";

export type PlanFormData = Omit<CreatePlanPayload, "features"> & { features: string };

interface AddPlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  planToEdit?: IPlan;
  viewMode?: boolean;
}

export function AddPlanDialog({ isOpen, onClose, planToEdit, viewMode = false }: AddPlanDialogProps) {
  const { mutate: createPlan, isPending: isCreating } = useAddPlan();
  const { mutate: updatePlan, isPending: isUpdating } = useUpdatePlan();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<PlanFormData>({
    defaultValues: {
      name: "",
      price: 0,
      period: "",
      description: "",
      features: "",
      isActive: true,
      popular: false,
      buttonText: "Get Started",
      isCustom: false,
    },
  });

  // Watch switches
  const popularValue = useWatch({ control, name: "popular" });
  const activeValue = useWatch({ control, name: "isActive" });

  const resetForm = useCallback(() => {
    reset({
      name: "",
      price: 0,
      period: "",
      description: "",
      features: "",
      isActive: true,
      popular: false,
      buttonText: "Get Started",
      isCustom: false,
    });
  }, [reset]);

  // Populate form when editing/viewing
  useEffect(() => {
    if (!isOpen) {
      resetForm();
      return;
    }
    if (planToEdit) {
      reset({
        ...planToEdit,
        features: Array.isArray(planToEdit.features)
          ? planToEdit.features.join(", ")
          : "",
      });
    } else resetForm();
  }, [isOpen, planToEdit, reset, resetForm]);

  // Submit handler
  const onSubmit = (data: PlanFormData) => {
    if (viewMode) return; // view-only does nothing

    const featuresArray = data.features.split(",").map(f => f.trim()).filter(Boolean);

    if (planToEdit) {
      // Edit existing plan
      const payload: IPlan = {
        ...planToEdit,
        ...data,
        features: featuresArray,
        updatedAt: new Date(),
      };
      updatePlan(payload, {
        onSuccess: () => {
          onClose();
          resetForm();
        },
      });
    } else {
      // Create new plan
      const payload: Omit<IPlan, "_id"> = {
        ...data,
        features: featuresArray,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      createPlan(payload, {
        onSuccess: () => {
          onClose();
          resetForm();
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="border-divider border-b pb-4">
          <DialogTitle className="flex items-center gap-2">
            {planToEdit ? (
              <>
                {viewMode ? <Eye size={20} className="text-primary" /> : <Edit3 size={20} className="text-primary" />}
                {viewMode ? "View Plan" : "Edit Plan"}
              </>
            ) : (
              <>
                <Package size={20} className="text-primary" /> Add Plan
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {/* Plan Name */}
          <div className="space-y-2">
            <Label>Plan Name *</Label>
            <Input
              placeholder="Enter plan name"
              {...register("name", { required: "Plan name is required" })}
              disabled={viewMode}
            />
            {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label>Price {!planToEdit?.isCustom && "*"}</Label>
            <Input
              type="number"
              placeholder="Enter price"
              {...register("price", {
                required: !planToEdit?.isCustom && "Price is required",
                valueAsNumber: true,
              })}
              disabled={viewMode}
            />
            {errors.price && <p className="text-destructive text-xs">{errors.price.message}</p>}
          </div>

          {/* Period */}
          <div className="space-y-2">
            <Label>Billing Period *</Label>
            <Input
              placeholder="Monthly / Yearly"
              {...register("period", { required: "Period is required" })}
              disabled={viewMode}
            />
            {errors.period && <p className="text-destructive text-xs">{errors.period.message}</p>}
          </div>

          {/* Popular Switch */}
          <div className="flex items-center justify-between">
            <Label>Mark as Popular</Label>
            <Switch
              checked={popularValue}
              onCheckedChange={(val) => setValue("popular", Boolean(val), { shouldDirty: true })}
              disabled={viewMode}
            />
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Plan description..."
              {...register("description")}
              className="resize-none h-24"
              disabled={viewMode}
            />
          </div>

          {/* Features */}
          <div className="space-y-2 md:col-span-2">
            <Label>Features (comma separated)</Label>
            <Textarea
              placeholder="Feature1, Feature2, ..."
              {...register("features")}
              className="resize-none h-24"
              disabled={viewMode}
            />
          </div>

          {/* Active Switch */}
          <div className="flex items-center justify-between md:col-span-2 pt-2">
            <Label>Active Status</Label>
            <Switch
              checked={activeValue}
              onCheckedChange={(val) => setValue("isActive", Boolean(val), { shouldDirty: true })}
              disabled={viewMode}
            />
          </div>

          {/* Footer */}
          <DialogFooter className="border-divider md:col-span-2 flex justify-end gap-3 border-t pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isCreating || isUpdating}>
              <XCircle size={16} className="mr-1" /> {viewMode ? "Close" : "Cancel"}
            </Button>
            {!viewMode && (
              <Button type="submit" disabled={isCreating || isUpdating}>
                {planToEdit
                  ? isUpdating
                    ? "Updating..."
                    : "Update Plan"
                  : isCreating
                  ? "Creating..."
                  : "Create Plan"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}