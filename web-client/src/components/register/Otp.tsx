import React from 'react'
import { Button } from '@/components/ui/button'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

interface OtpViewProps {
    email?: string;
    onVerify?: () => void;
}

export function OtpView({ email, onVerify }: OtpViewProps) {
    return (
        <div className='w-full flex flex-col items-center gap-4 mt-2'>
            <div className='flex flex-col justify-center'>
                <h2 className='text-accent-foreground text-center text-lg font-bold'>Verify Your Email</h2>
                <p className='text-center text-sm text-muted-foreground mt-2'>
                    Please check your email {email ? <span className='font-bold'>{email}</span> : ''} for verification.
                </p>
            </div>

            <div className='w-full flex flex-col gap-4 mt-4 items-center'>
                <InputOTP maxLength={6}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>

                <Button size='lg' className='w-full mt-2' onClick={() => {
                    if (onVerify) {
                        onVerify();
                    }
                }}>
                    Verify
                </Button>
            </div>
        </div>
    )
}