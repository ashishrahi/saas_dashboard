"use client";

import { ConfirmDialog } from "@/components/design-system/confirm-dialog";
import { Trash2 } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onConfirm: () => void;
  featureTitle?: string;
  isDeleting?: boolean;
}

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  featureTitle,
  isDeleting = false,
}: DeleteModalProps) {
  return (
    <ConfirmDialog
      open={isOpen}
      onOpenChange={onClose}
      title="Confirm deletion"
      icon={<Trash2 className="text-destructive size-5" />}
      description={
        <>
          Are you sure you want to delete{" "}
          <strong className="text-heading">{featureTitle ?? "this item"}</strong>? This action
          cannot be undone.
        </>
      }
      cancelLabel="Cancel"
      confirmLabel="Delete"
      destructive
      confirmLoading={isDeleting}
      onConfirm={onConfirm}
    />
  );
}
