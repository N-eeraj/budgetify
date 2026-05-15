import React, { useState } from 'react'
import Input from "@/components/base/Input"
import { Field } from '../components/ui/field'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { Icon } from "@iconify/react"
import { Link } from 'react-router'

function login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  return (
    <main className='w-screen h-screen flex flex-col items-center justify-center bg-background gap-10'>
      <div className='w-90 flex flex-col items-center justify-center min-h-50 md:border border-primary bg-background md:bg-card rounded-md p-10 md:shadow-2xl'>
        <h1 className='text-lg text-primary font-black'>
          Budgetify
        </h1>
        <span className="mb-6 mt-2 text-md font-bold text-foreground">
          Create Your account
        </span>
        <div className="w-full flex flex-col gap-4 mt-2">
          <Field>
            <Label htmlFor="email" className='text-muted-foreground'>Your email address</Label>
            <Input
              id="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
           <Field>
                <Label htmlFor="password" className='text-muted-foreground'>Password</Label>
                <Input 
                    id="password" 
                    type="password"
                    placeholder='Password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Field>
          <Button size="lg" className="w-full" >
            Login
            <Icon icon="maki:arrow" width="24" height="24" />
          </Button>
        </div>
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

export default login