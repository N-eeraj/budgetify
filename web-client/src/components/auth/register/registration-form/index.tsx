import {
  FormProvider,
  useForm,
} from "react-hook-form"

import OtpView from "@/components/auth/register/registration-form/Otp"
import Details from "@/components/auth/register/registration-form/Details"


import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const detailSchema = z.object({
  email: z.email(),
  otp: z.string(),
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  password: z.
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
    .min(5, "Password must be at least 5 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/,
    "Must contain at least one special character"
  ),
})



interface RegistrationFormProps {
  email: string
}

type FormData = z.infer<typeof detailSchema>;

function RegistrationForm({
  email,
}: RegistrationFormProps) {

  const formMethods = useForm<FormData>({
    defaultValues: {
      email,
      otp: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(detailSchema),
  })


const otp = formMethods.watch('otp')

const onDetailsSubmit = (data: FormData) => {
  console.log(data)
}

  return (
    <FormProvider {...formMethods}>
      <form
        className="w-full"
        onSubmit={formMethods.handleSubmit(onDetailsSubmit)}
      >

        {
          otp ? (
            <Details 
            email={email}
            />
          ) :
            <OtpView email={email} setOtp={(otp) => formMethods.setValue("otp", otp)} />
        }

      </form>
    </FormProvider>
  )
}

export default RegistrationForm
