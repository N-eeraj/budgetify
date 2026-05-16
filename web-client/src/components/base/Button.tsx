import { Button } from "@components/ui/button";
import { cn } from "@/lib/utils"
import {
  Fragment,
  type ComponentProps,
} from "react";
import { Spinner } from "@components/ui/spinner";

interface Props extends ComponentProps<typeof Button> {
  loading?: boolean;
}

export default function DsButton({
  variant = "default",
  disabled,
  loading=false,
  children,
  className,
  ...props
}: Props) {
  const ChildWrapper = loading ? "div" : Fragment;
  const childWrapperProps = loading ? {
    className: cn(loading && "invisible")
  } : {};

  return (
    <Button
      disabled={disabled || loading}
      className={cn(
        "relative transition-all duration-300",
        !loading && "disabled:grayscale-50",
        className,
      )}
      {...props}
    >
      {loading && <Spinner className="absolute top-1/2 left-1/2 -translate-1/2" />}
      <ChildWrapper {...childWrapperProps}>
        {children}
      </ChildWrapper>
    </Button>
  );
}
