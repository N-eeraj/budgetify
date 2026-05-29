import { Icon } from "@iconify/react"
import { Link } from "react-router"
import { useForm } from "react-hook-form"

import Button from "@components/base/Button"
import Input from "@components/base/Input"
import { Field } from "@components/ui/field"
import { Label } from "@components/ui/label"

interface EmailFormProps {
  setEmail: (value: string) => void
  setIsOtpOpen: (value: boolean) => void
}

interface EmailInput {
  email: string
}

function EmailForm({
  setEmail,
  setIsOtpOpen,
}: EmailFormProps) {

  const { register, handleSubmit } =
    useForm<EmailInput>()

  const onSubmit = ({ email }: EmailInput) => {
    console.log(email)

    setEmail(email)
    setIsOtpOpen(true)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full"
    >
      <div className="mt-2 flex w-full flex-col gap-4">

        <Field>
          <Label
            htmlFor="email"
            className="text-muted-foreground"
          >
            Email
          </Label>

          <Input
            {...register("email", {
              required: "Email is required",
            })}
            className="rounded border p-2"
          />
        </Field>

        <Button
          type="submit"
          size="lg"
          className="w-full"
        >
          Continue

          <Icon
            icon="icons8:right-arrow"
            width="24"
            height="24"
          />
        </Button>
      </div>

      <div className="pt-10 text-sm text-muted-foreground">
        Already have an account?

        <Link
          to="/login"
          className="pl-2 text-sm font-black text-primary underline"
        >
          Login
        </Link>
      </div>
    </form>
  )
}

export default EmailForm