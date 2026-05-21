import { useState } from "react"
import Input from "@components/base/Input"
import { Field } from "@components/ui/field"
import { Label } from "@components/ui/label"
import Button from "@components/base/Button"
import { Link } from "react-router"
import OtpView from "@/components/auth/register/Otp"
import Details from "@/components/auth/register/Details"
import { Icon } from "@iconify/react"
import { useForm, Controller, type SubmitHandler } from "react-hook-form"

interface IFormInput {
  email: string
}

function Register() {
  const [isOtpOpen, setIsOtpOpen] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)

  const { control, handleSubmit, watch } = useForm<IFormInput>({
    defaultValues: {
      email: "",
    },
  })

  const email = watch("email")

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)

    if (data.email.trim()) {
      setIsOtpOpen(true)
    }
  }

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center bg-background gap-10">
      <div className="w-90 flex flex-col items-center md:shadow-2xl justify-center min-h-50 md:border border-primary bg-background md:bg-card rounded-md p-10">

        <h1 className="text-lg text-primary font-black">
          Budgetify
        </h1>

        <span className="mb-6 mt-2 text-md font-bold text-foreground">
          Create Your account
        </span>

        {!isOtpOpen && !isOtpVerified && (
          <form onSubmit={handleSubmit(onSubmit)}
          className="w-full"
          >

            <div className="w-full flex flex-col gap-4 mt-2">

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Field>
                    <Label
                      htmlFor="email"
                      className="text-muted-foreground"
                    >
                      Email
                    </Label>

                    <Input
                      id="email"
                      placeholder="Your email address"
                      {...field}
                    />
                  </Field>
                )}
              />

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

            <div className="text-sm text-muted-foreground pt-10">
              Already have an account?

              <Link
                to="/login"
                className="text-primary font-black text-sm pl-2 underline"
              >
                Login
              </Link>
            </div>

          </form>
        )}

        {isOtpOpen && !isOtpVerified && (
          <OtpView
            email={email}
            onVerify={() => setIsOtpVerified(true)}
          />
        )}

        {isOtpVerified && (
          <Details email={email} />
        )}

      </div>
    </main>
  )
}

export default Register