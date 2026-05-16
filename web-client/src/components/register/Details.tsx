import { useState } from 'react'
import Input from "@components/base/Input"
import { Field } from '@components/ui/field'
import { Label } from '@components/ui/label'
import { Button } from '@components/ui/button'

interface DetailsProps {
  email: string;
}

export function Details({ email }: DetailsProps) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className="w-full flex flex-col gap-4 mt-2">
      <Field>
        <Label htmlFor="name" className='text-muted-foreground'>
          Name
        </Label>
        <Input
          id="name"
          placeholder='Enter your name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

      </Field>
      <Field>
        <Label htmlFor="password" className='text-muted-foreground'>
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder='Enter a strong password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>
      <Field>
        <Label htmlFor="confirmPassword" className='text-muted-foreground'>
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder='Re-enter your password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Field>
      <Button size="lg" className="w-full mt-2" onClick={() => {
        console.log("Registering...", { email, name, password, confirmPassword })
      }}>
        Complete Registration
      </Button>
    </div>
  )
}