import { Button } from "@components/ui/button"
import { Field, FieldGroup } from "@components/ui/field"
import Input from "@components/base/Input"
import { Label } from "@components/ui/label"
import { Icon } from "@iconify/react"
import { useState } from "react"

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

interface Props {
  email: string
}

function ResetPassword({ email }: Props) {
  const [resetEmail, setResetEmail] = useState("")

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild onClick={() => setResetEmail(email)}>
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
                name="email"
                placeholder="Enter your email address"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
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

export default ResetPassword
