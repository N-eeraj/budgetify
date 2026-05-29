import {
    FormProvider,
    useForm,
    type SubmitHandler,
} from "react-hook-form"

import OtpView from "@/components/auth/register/registration-form/Otp"
import Details from "@/components/auth/register/registration-form/Details"
import { useEffect } from "react"

interface IFormInput {
    email: string
    name: string
    password: string
    confirmPassword: string
    otp: string
}

interface RegistrationFormProps {
    email: string
    isOtpOpen: boolean
    isOtpVerified: boolean
    setIsOtpVerified: (value: boolean) => void
}

function RegistrationForm({
    email,
    isOtpOpen,
    isOtpVerified,
    setIsOtpVerified,
}: RegistrationFormProps) {

    const form = useForm<IFormInput>({
        defaultValues: {
            email: email,
            otp: "",
            name: "",
            password: "",
            confirmPassword: "",
        },
    })

    const { handleSubmit, setValue } = form

    useEffect(() => {
        setValue("email", email)
    }, [email, setValue])

    const onDetailsSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data)
    }

    return (
        <FormProvider {...form}>
            <form
                className="w-full"
                onSubmit={handleSubmit(onDetailsSubmit)}
            >

                {isOtpOpen && !isOtpVerified && (
                    <OtpView
                        email={email}
                        onVerify={() => setIsOtpVerified(true)}
                    />
                )}

                {isOtpVerified && (
                    <Details email={email} />
                )}

            </form>
        </FormProvider>
    )
}

export default RegistrationForm