import {
  Fragment,
  useId,
  useState,
  type ComponentProps,
  type HTMLAttributes,
  type HTMLInputTypeAttribute,
} from "react";
import { Input } from "@components/ui/input"
import { Button } from "@components/ui/button"
import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react"

interface Props extends ComponentProps<typeof Input> {
  label?: string;
  error?: string;
  labelWrapperProps?: HTMLAttributes<HTMLDivElement>;
  inputWrapperProps?: HTMLAttributes<HTMLDivElement>;
}

export default function BaseInput({
  label,
  type,
  error,
  className,
  inputWrapperProps = {},
  labelWrapperProps = {},
  ...props
}: Props) {
  const id = useId();

  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type ?? "text");
  const togglePasswordType = () => {
    setInputType((prev) => {
      if (prev === "password") return "text";
      return "password";
    });
  };

  const Wrapper = label ? "div" : Fragment;
  const wrapperProps = label ? {
    ...labelWrapperProps,
    className: cn(
      className,
      labelWrapperProps.className,
      "flex flex-col gap-y-1",
    )
  } : {};

  return (
    <Wrapper {...wrapperProps}>
      {label && (
        <label
          htmlFor={id}
          className={"text-sm"}>
          {label}
        </label>
      )}

      <div
        {...inputWrapperProps}
        className={cn(
          inputWrapperProps.className,
          "relative",
        )}>
        <Input
          id={id}
          type={type === "password" ? inputType : type}
          className={cn(className, 'placeholder:text-xs text-sm')}
          {...props}
        />

        {type === "password" && (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            tabIndex={-1}
            className="absolute top-1/2 right-0 p-0 -translate-x-1/4 -translate-y-1/2"
            onClick={togglePasswordType}>
            <Icon
              icon={inputType === "password" ? 'mdi:eye-outline' : 'basil:eye-closed-outline'}
              width="20"
              height="20"
              className="text-muted-foreground" />
          </Button>
        )}
        {error && (
          <p className="text-red-500 text-xs mt-1">
            {error}
          </p>
        )}
      </div>
    </Wrapper>
  );
}