import React from 'react'
import { Input } from '../components/ui/input'
import { Field } from '../components/ui/field'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { Link } from 'react-router'
// import { Icon } from "@iconify/react"

function register() {
  return (
    <main className='w-screen h-screen flex flex-col items-center justify-center bg-background gap-10'>
      <div className='w-90 flex flex-col items-center min-h-50 border border-primary bg-card rounded-md p-10'>
        <h1 className='text-lg text-primary font-black'>
          Budgetify
        </h1>
        <span className="mb-6 mt-2 text-md font-bold text-foreground">
          Create Your account
        </span>
        <div className="w-full flex flex-col gap-4 mt-2">
          <Field>
            <Label htmlFor="email" className='text-muted-foreground'>Your email address</Label>
            <Input id="email" placeholder='Email' />
          </Field>
          <Button size="lg" className="w-full">
            Continue
            {/* <Icon name="mdi:home" width="24" height="24" /> */}
          </Button>
        </div>
        <div className='w-full flex items-center gap-3 pt-6 text-muted-foreground'>
          <span className='h-[.5px] flex-1 bg-accent'/>
          or
          <span className='h-[.5px] flex-1 bg-accent' />
        </div>
        <div className='text-sm text-muted-foreground pt-5'>
          Already have an account?
          <Link to="/login" className='text-primary font-black text-sm pl-2 underline'>
            Login
          </Link>
        </div>
      </div>
    </main>
  )
}

export default register