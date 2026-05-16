import React, { useState } from 'react'
import Input from "@/components/base/Input"
import { Field } from '@/components/ui/field'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import { OtpView } from '@/components/register/Otp'
import { Details } from '@/components/register/Details'
import { Icon } from "@iconify/react"

function register() {
  const [email, setEmail] = useState('')
  const [isOtpOpen, setIsOtpOpen] = useState(false) // Determines if we are on the OTP step
  const [isOtpVerified, setIsOtpVerified] = useState(false)

  return (
    <main className='w-screen h-screen flex flex-col items-center justify-center bg-background gap-10'>
      <div className='w-90 flex flex-col items-center md:shadow-2xl justify-center min-h-50 md:border border-primary bg-background md:bg-card rounded-md p-10'>
        <h1 className='text-lg text-primary font-black'>
          Budgetify
        </h1>
        <span className="mb-6 mt-2 text-md font-bold text-foreground">
          Create Your account
        </span>
        
        {!isOtpOpen && !isOtpVerified && (
          <>
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
              <Button size="lg" className="w-full" onClick={() => {
                if (email.trim()) {
                  setIsOtpOpen(true)
                }
              }}>
                Continue
                <Icon icon="icons8:right-arrow" width="24" height="24" />
              </Button>
            </div>
            <div className='text-sm text-muted-foreground pt-10'>
              Already have an account?
              <Link to="/login" className='text-primary font-black text-sm pl-2 underline'>
                Login
              </Link>
            </div>
          </>
        )}

        {isOtpOpen && !isOtpVerified && (
          <OtpView 
            email={email} 
            onVerify={() => {
              setIsOtpVerified(true)
            }}
          />
        )}

        {isOtpVerified && (
          <Details email={email} />
        )}
      </div>
    </main>
  )
}

export default register