import Input from "@components/base/Input"
import { Field } from '@components/ui/field'
import { Label } from '@components/ui/label'
import Button from "@components/base/Button"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface resetPasswordProps {
  onSubmit: (data: FormData) => void
}

// schema change to emailSchema for search
const resetPasswordSchema = z.object({
  newPassword: z.
    string()
    .min(5, "Password must be at least 5 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/,
      "Must contain at least one special character"
    ),
  confirmPassword: z.
    string()
}).superRefine((val, ctx) => {
  if (val.newPassword !== val.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
  }
})

type FormData = z.infer<typeof resetPasswordSchema>;

function ResetPassword({
  onSubmit: onSuccess,
}: resetPasswordProps) {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>(
    {
      resolver: zodResolver(resetPasswordSchema),

      defaultValues: {
        newPassword: "",
        confirmPassword: "",
      }
    }
  )

  const onSubmit = (data: FormData) => {
    console.log(data)
    onSuccess(data)
  }

  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-90 flex flex-col items-center justify-center min-h-50 md:border border-primary bg-background md:bg-card rounded-md p-10 md:shadow-2xl gap-4">
        <div className="flex flex-col gap-1 items-center">
          <h1 className='text-lg text-primary font-black'>
            Reset Password
          </h1>
          <span className="text-xs text-muted-foreground">
            Create a new password to secure your account
          </span>
        </div>
        <form
          className="w-full flex flex-col gap-4 mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field>
            <Label htmlFor="email" className='text-muted-foreground'>
              New Password
            </Label>
            <Input
            type="password"
              id="password"
              placeholder='New password'
              {...register("newPassword")}
              error={errors.newPassword?.message}
            />
          </Field>
          <Field>
            <Label htmlFor="email" className='text-muted-foreground'>
              Confirm Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder='Cpnfirm password'
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
          </Field>
          <Button size="lg" className="w-full mt-5" >
            Reset Password
          </Button>
        </form>
      </div>
    </section>
  )
}

export default ResetPassword
