import { useFormContext } from "react-hook-form"
import Input from "@components/base/Input"
import { Field } from '@components/ui/field'
import { Label } from '@components/ui/label'
import Button from "@components/base/Button"


function Details() {
  const {getValues, register} = useFormContext();
  console.log(getValues());
  return (
    <div className="w-full flex flex-col items-center mt-2">
      <img src="/budgetify-logo.png" className='w-20' alt="budgetify logo" />
      <h1 className="text-xl text-primary font-black">
        Budgetify
      </h1>
      <div className='w-full flex flex-col items-center gap-4 mt-10'>
        <div className="w-full flex flex-col text-left text-accent-foreground">
          <label htmlFor="" className='text-muted-foreground texy-sm'>
            Email
          </label>
          <span className="text-accent-foreground text-sm">
             {getValues("email")}
          </span>
        </div>
        <Field>
          <Label htmlFor="name" className='text-muted-foreground'>
            Name
          </Label>
          <Input
            id="name"
            placeholder="Enter your name"
            {...register("name")}
          />

        </Field>
        <Field>
          <Label htmlFor="password" className='text-muted-foreground'>
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter a strong password"
            {...register("password")}
          />
        </Field>
        <Field>
          <Label htmlFor="confirmPassword" className='text-muted-foreground'>
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            {...register("confirmPassword")}
          />
        </Field>
        <Button
          type="submit"
          size="lg"
          className="w-full mt-2"
        >
          Complete Registration
        </Button>
      </div>
    </div>
  )
}

export default Details