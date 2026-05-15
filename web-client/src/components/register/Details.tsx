import React, { useState } from 'react'
import Input from "@/components/base/Input"
import { Field } from '../ui/field'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Icon } from "@iconify/react"

interface DetailsProps {
    email: string;
}

export function Details({ email }: DetailsProps) {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    return (
        <div className="w-full flex flex-col gap-4 mt-2">
            <Field className='w-full relative flex flex-col'>
                <Label htmlFor="email" className='text-muted-foreground'>Email</Label>
                <Input 
                    id="email" 
                    value={email}
                    readOnly
                    className="bg-muted text-muted-foreground cursor-not-allowed"

                />
                <Icon icon="material-symbols-light:info-outline-rounded"  className='absolute !w-min top-3/5 right-2 border' />
            </Field>
            <Field>
                <Label htmlFor="name" className='text-muted-foreground'>Name</Label>
                <Input 
                    id="name" 
                    placeholder='Your name' 
                    value={name}
                    onChange={(e) => setName(e.target.value)}

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
            <Field>
                <Label htmlFor="confirmPassword" className='text-muted-foreground'>Confirm Password</Label>
                <Input 
                    id="confirmPassword" 
                    type="password"
                    placeholder='Confirm Password' 
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