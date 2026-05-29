import {
  FormProvider,
  useForm,
} from "react-hook-form"

import OtpView from "@/components/auth/register/registration-form/Otp"
import Details from "@/components/auth/register/registration-form/Details"

interface RegistrationFormProps {
  email: string
}

function RegistrationForm({
  email,
}: RegistrationFormProps) {

  const formMethods = useForm({
    defaultValues: {
      email,
      otp: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  })

  const otp = formMethods.getValues('otp')

  const onDetailsSubmit = (data) => {
    console.log(data)
  }

  return (
    <FormProvider {...formMethods}>
      {otp}
      <form
        className="w-full"
        onSubmit={formMethods.handleSubmit(onDetailsSubmit)}
      >

        {
          otp.length === 6 ? (
            <Details email={email} />
          ) :
            <OtpView email={email} setOtp={(value) => formMethods.setValue("otp", value)} />
        }

      </form>
    </FormProvider>
  )
}

export default RegistrationForm
