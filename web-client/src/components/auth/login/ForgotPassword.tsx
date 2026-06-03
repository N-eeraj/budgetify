import Button from "@components/base/Button"
import { Field, FieldGroup } from "@components/ui/field"
import Input from "@components/base/Input"
import { Label } from "@components/ui/label"
import { Icon } from "@iconify/react"
// import { useState } from "react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// schema change to emailSchema for search
const emailSchema = z.object({
  email: z
    .email({
      error: "Please enter a valid email address"
    })
})

interface EmailFormProps {
  email: string
  onSubmit?: (value: string) => void
}

  type FormData = z.infer<typeof emailSchema>



function ForgotPassword({ onSubmit: onSuccess, email
}: EmailFormProps) {

  // const [resetEmail, setResetEmail] = useState("")

  const {
  register,
  handleSubmit,
  setValue,
  formState: { errors }
} = useForm<FormData>({
  resolver: zodResolver(emailSchema),
})

  const onSubmit = (data: FormData) => {
    console.log(data)
    onSuccess?.(data.email)
    console.log("hi")
  }



  return (
    <Dialog>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTrigger asChild onClick={() => setValue("email", email)}>
          <span className="text-xs text-muted-foreground/75 cursor-pointer">
            Forgot Password?
          </span>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg w-full flex flex-col items-center border border-primary bg-card p-10">
          <DialogHeader>
            <DialogTitle className="w-full flex flex-col items-center">
              <img src="/budgetify-logo.png" className='w-20' alt="budgetify logo" />
              <span className="text-xl text-accent-foreground font-bold">
                Reset Your Password
              </span>
            </DialogTitle>
            <DialogDescription className="text-center">
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="pt-5">
            <Field>
              <Label htmlFor="reset_password_email">
                Email
              </Label>
              <Input
                id="reset_password_email"
                placeholder="Enter your email address"
                {...register("email")}
                error={errors.email?.message}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="w-full">
            <DialogClose asChild className="sm:flex-1">
              <Button variant="outline" size="lg">
                <Icon icon="icons8:left-arrow" width="24" height="24" />
                Back to login
              </Button>
            </DialogClose>
            <Button type="submit" size="lg" className="sm:flex-1">
              Sent reset link
              <Icon icon="icons8:right-arrow" width="24" height="24" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default ForgotPassword
