import Input from "@components/base/Input"
import { Field } from '@components/ui/field'
import { Label } from '@components/ui/label'
import Button from "@components/base/Button"
import { Icon } from "@iconify/react"
import { Link } from 'react-router'
import ForgotPassword from "@/components/auth/login/ForgotPassword"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// schema change to emailSchema for search
const loginSchema = z.object({
  email: z
    .email({
      error: "Please enter a valid email address"
    }),
     password: z.
        string()
        .min(5, "Password must be at least 5 characters")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[0-9]/, "Must contain at least one number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/,
        "Must contain at least one special character"
      ),

})

type FormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: FormData) => void
}

function Login(
  {
    onSubmit: onSuccess,
  }: LoginFormProps
) {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>(
    {
      resolver: zodResolver(loginSchema),

      defaultValues: {
        email: "",
        password: "",
      }
    }
  )

  const onSubmit = (data: FormData) => {
    console.log(data)
    onSuccess(data)
  }

  const email = getValues("email")

  return (
    <main className='w-screen h-screen flex flex-col items-center justify-center bg-background gap-10'>
      <div className='w-90 flex flex-col items-center justify-center min-h-50 md:border border-primary bg-background md:bg-card rounded-md p-10 md:shadow-2xl'>
        <img src="/budgetify-logo.png" className='w-20' alt="budgetify logo" />
        <h1 className='text-lg text-primary font-black'>
          Budgetify
        </h1>
        <span className="mb-6 mt-2 text-md font-bold text-foreground">
          Login
        </span>
        <form
          className="w-full flex flex-col gap-4 mt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field>
            <Label htmlFor="email" className='text-muted-foreground'>
              Email
            </Label>
            <Input
              id="email"
              placeholder='Your email address'
              {...register("email")}
               error={errors.email?.message}
            />
          </Field>
          <div>
            <Field>
              <Label htmlFor="password" className='text-muted-foreground'>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder='Enter password'
                {...register("password")}
                 error={errors.password?.message}
              />
            </Field>

            <ForgotPassword email={email} />
          </div>

          <Button size="lg" className="w-full mt-5" >
            Login
            <Icon icon="icons8:right-arrow" width="24" height="24" />
          </Button>
        </form>
        <div className='text-sm text-muted-foreground pt-10'>
          You don't have an account?
          <Link to="/register" className='text-primary font-black text-sm pl-2 underline'>
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Login