import {ForgotPasswordData, ForgotPasswordFormErrors} from "@/modules/auth/types";

const ForgotPasswordFormValidation = (data: ForgotPasswordData, setErrors: (errors: ForgotPasswordFormErrors) => void):boolean => {
    const errors: ForgotPasswordFormErrors = {};

    if (!data.email.trim()) {
        errors.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Format d'email invalide"
    }

    setErrors(errors)
    return Object.keys(errors).length === 0
}

export default ForgotPasswordFormValidation;