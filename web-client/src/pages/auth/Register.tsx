import { useState } from "react"
import { Link } from "react-router"
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"
import { Icon } from "@iconify/react"

import { Field } from "@components/ui/field"
import { Label } from "@components/ui/label"
import Button from "@components/base/Button"

import OtpView from "@/components/auth/register/Otp"
import Details from "@/components/auth/register/Details"
import Input from "@components/base/Input"

interface IFormInput {
  email: string
  name: string
  password: string
  confirmPassword: string
  otp: string
}

function Register() {

  const defaultValues = {
    otp: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  const form =
    useForm<IFormInput>({
      defaultValues
    });

    const { register, handleSubmit, getValues } = form;

  const [isOtpOpen, setIsOtpOpen] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)

  const email = getValues("email")

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)

    if (data.email.trim()) {
      setIsOtpOpen(true)
    }
  }

  const onDetailsSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
  }

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center bg-background gap-10">
      <div className="w-90 flex flex-col items-center md:shadow-2xl justify-center min-h-50 md:border border-primary bg-background md:bg-card rounded-md p-10">

        {!isOtpOpen && !isOtpVerified && (
          <>
            <h1 className="text-xl text-primary font-black">
              Budgetify
            </h1>

            <span className="mb-6 mt-2 text-md font-bold text-foreground">
              Create Your Account
            </span>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full"
            >
              <div className="w-full flex flex-col gap-4 mt-2">

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
                    className="border p-2 rounded"
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
          </>
        )}

        <FormProvider {...form}>
          <form className="w-full" onSubmit={handleSubmit(onDetailsSubmit)}>
            {isOtpOpen && !isOtpVerified && (
              <OtpView
                onVerify={() => setIsOtpVerified(true)}
              />
            )}

            {isOtpVerified && (
              <Details
              />
            )}
          </form>
        </FormProvider>
      </div>
    </main>
  )
}

export default Register