import Button from "@components/base/Button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@components/ui/input-otp"
import { useState } from "react";

interface OtpViewProps {
  email: string
  setOtp: (otp: string) => void;
}

const OTP_LENGTH = 6 as const

function OtpView({ email, setOtp}: OtpViewProps) {

  const [localOtp, setLocalOtp] = useState("")

  const handleVerification = () => {
  if (localOtp.length === OTP_LENGTH) {
    setOtp(localOtp)
  } 
}

  return (
    <div className='w-full flex flex-col items-center gap-4 mt-2'>
      <div className='flex flex-col justify-center'>
        <h2 className='text-accent-foreground text-center text-lg font-bold'>Verify Your Email</h2>
        <p className='text-center text-sm text-muted-foreground mt-2'>
          Please check your email {email ? <span className='font-bold'>{email}</span> : ''} for verification.
        </p>
      </div>

      <div className='w-full flex flex-col gap-4 mt-4 items-center'>
        <InputOTP 
         maxLength={OTP_LENGTH}
        value={localOtp}
        onChange= {setLocalOtp}
        >
          <InputOTPGroup className="border border-primary">
            {Array.from({ length: OTP_LENGTH }).map((_, index) => (
              <InputOTPSlot index={index} className="border-primary" />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <Button 
        type="button"
        size='lg' 
       disabled={!localOtp || localOtp.length !== OTP_LENGTH}
        className='w-full mt-2' 
        onClick={handleVerification}>
          Verify
        </Button>
      </div>
    </div>
  )
}

export default OtpView