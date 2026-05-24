import * as React from "react";
import { Button } from "@/components/ui/button";

type CustomVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

interface AppButtonProps extends Omit<React.ComponentProps<typeof Button>, "variant"> {
  children: React.ReactNode;
  variant?: CustomVariant;
  className?: string;
}

const variantMap: Record<CustomVariant, NonNullable<React.ComponentProps<typeof Button>["variant"]>> = {
  primary: "default",
  secondary: "secondary",
  outline: "outline",
  ghost: "ghost",
  danger: "destructive",
};

export const AppButton: React.FC<AppButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <Button variant={variantMap[variant]} className={className} {...props}>
      {children}
    </Button>
  );
};
