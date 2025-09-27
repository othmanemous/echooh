import {LoginData, LoginFormErrors} from "@/modules/auth/types";

const LoginFormValidation = (formData: LoginData, setError: (errors: LoginFormErrors) => void): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.email) {
        newErrors.email = "L'adresse email est requise";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "L'adresse email n'est pas valide";
    }

    if (!formData.password) {
        newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
        newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
}

export default LoginFormValidation;