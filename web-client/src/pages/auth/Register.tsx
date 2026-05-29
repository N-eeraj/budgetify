import { useState } from "react"

import EmailForm from "@/components/auth/register/EmailForm"
import RegistrationForm from "@/components/auth/register/registration-form"

function Register() {
  const [email, setEmail] = useState("")
  const [isOtpOpen, setIsOtpOpen] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-10 bg-background">
      <div className="flex min-h-50 w-90 flex-col items-center justify-center rounded-md border border-primary bg-background p-10 md:bg-card md:shadow-2xl">

        {!isOtpOpen && !isOtpVerified && (
          <>
            <h1 className="text-xl font-black text-primary">
              Budgetify
            </h1>

            <span className="mt-2 mb-6 text-md font-bold text-foreground">
              Create Your Account
            </span>

            <EmailForm
              setEmail={setEmail}
              setIsOtpOpen={setIsOtpOpen}
            />
          </>
        )}

        <RegistrationForm
          email={email}
          isOtpOpen={isOtpOpen}
          isOtpVerified={isOtpVerified}
          setIsOtpVerified={setIsOtpVerified}
        />
      </div>
    </main>
  )
}

export default Register