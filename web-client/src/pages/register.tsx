import React from 'react'
import { Input } from '../components/ui/input'
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
          <span className="mb-6 mt-2 text-sm text-muted-foreground">
            Create Your account
          </span>
          <div className="w-full flex flex-col gap-4 mt-2">
            <Input type="email" placeholder="name@example.com" />
            <Button className="w-full">
               Continue
               {/* <Icon name="mdi:home" width="24" height="24" /> */}
            </Button>
          </div>
      </div>
      <div className='text-sm text-muted-foreground'>
        Already have an account?
        <Link to="/login" className='text-primary font-black text-sm pl-2 underline'>
          Login
        </Link>
      </div>
    </main>
  )
}

export default register