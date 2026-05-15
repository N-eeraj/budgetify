import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icon } from "@iconify/react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

interface BaseInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

const BaseInput = ({
    label,
    error,
    className,
    id,
    placeholder,
    value,
    type,
    ...props
}: BaseInputProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const inputType =
        type === "password"
            ? showPassword
                ? "text"
                : "password"
            : type

    return (
        <div className="grid gap-2 w-full">
            {label && <Label htmlFor={id}>{label}</Label>}
            <div className="relative w-full">
                <Input
                    id={id}
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    className={cn(className, 'placeholder:text-xs text-sm')}
                    {...props}
                />

                {type === 'password' && (
                    <Button
                        type="button"
                        variant="ghost"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <Icon
                                icon="mdi:eye-outline" width="20" height="20" className="text-muted-foreground"
                            />
                        ) : (
                            <Icon
                                icon="basil:eye-closed-outline" width="20" height="20" className="text-muted-foreground"
                            />
                        )}
                    </Button>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    )
}

export default BaseInput