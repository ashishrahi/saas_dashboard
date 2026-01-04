  import { useEffect, useState, useCallback } from "react";
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

  import {
    Upload,
    Trash2,
    XCircle,
    Tag,
    Edit3,
    Image as ImageIcon,
  } from "lucide-react";

  import { AppButton } from "@/AppComponent/AppButton";

  import type{ IFeatures}  from "@/types/IFeatures";

  interface AddFeatureDialogProps {
    isOpen: boolean;
    onClose: () => void;
    featureToEdit?: IFeatures;
  }

  interface ImageState {
    url: string;
    type: "existing" | "new";
    file?: File;
  }

  interface FeatureFormData {
    name: string;
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

    const [images, setImages] = useState<ImageState[]>([]);

    const resetForm = useCallback(() => {
      reset({ name: "", description: "" });
      setImages([]);
    }, [reset]);

    useEffect(() => {
      if (!isOpen) {
        resetForm();
        return;
      }

      if (featureToEdit) {
        reset({
          name: featureToEdit?.name ?? "",
          description: featureToEdit.description ?? "",
        });

        const existingImages = (featureToEdit?.images || []).map((url) => ({
          url,
          type: "existing" as const,
        }));

        setImages(existingImages);
      } else {
        resetForm();
      }
    }, [isOpen, featureToEdit, reset, resetForm]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      const newImages = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        type: "new" as const,
        file,
      }));

      setImages((prev) => [...prev, ...newImages]);
      e.target.value = "";
    };

    const removeImage = (index: number) => {
      const img = images[index];

      if (img.type === "new" && img.url.startsWith("blob:")) {
        URL.revokeObjectURL(img.url);
      }

      setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = (data: FeatureFormData) => {
      console.log("UI only form submit:", data);
      console.log("Selected images:", images);
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
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Feature Name *</Label>
              <Input
                id="name"
                placeholder="Feature name"
                {...register("name", {
                  required: "Feature name is required",
                  minLength: {
                    value: 2,
                    message: "Minimum 2 characters required",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
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

            {/* Image Upload */}
            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-2">
                <ImageIcon size={16} /> Images
              </Label>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="imageUpload"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                >
                  <Upload size={16} />
                  Upload Images
                </label>

                <input
                  id="imageUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <span className="text-sm">{images.length} selected</span>
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {images.map((image, idx) => (
                    <div
                      key={idx}
                      className="relative border rounded overflow-hidden group"
                    >
                      <img src={image.url} className="w-full h-28 object-cover" />

                      <span
                        className={`absolute top-1 left-1 text-xs px-1 rounded text-white ${
                          image.type === "existing"
                            ? "bg-green-600"
                            : "bg-blue-600"
                        }`}
                      >
                        {image.type === "existing" ? "Existing" : "New"}
                      </span>

                      <AppButton
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100"
                      >
                        <Trash2 size={12} />
                      </AppButton>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <DialogFooter className="md:col-span-2 flex justify-end gap-3 pt-4 border-t">
              <AppButton variant="outline" type="button" onClick={onClose}>
                <XCircle size={16} /> Cancel
              </AppButton>

              <AppButton type="submit">
                <Upload size={16} />
                {featureToEdit ? "Update Feature" : "Add Feature"}
              </AppButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
