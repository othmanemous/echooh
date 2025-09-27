import {RegisterData, RegisterFormErrors} from "@/modules/auth/types";

const registerFormValidation = (formData: RegisterData, setError: (errors: RegisterFormErrors) => void): boolean => {
    const errors: RegisterFormErrors = {};

    if (!formData.name.trim()) {
        errors.name = 'Le nom est requis';
    }

    if (!formData.prenom.trim()) {
        errors.prenom = 'Le prenom est requis';
    }

    if (!formData.email) {
        errors.email = 'L\'adresse email est requise';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Format d\'email invalide';
    }
    if (!formData.phone.trim()) {
        errors.phone = 'Le numéro de téléphone est requis';
    }

    if (!validatePhoneNumber(formData.phone)) errors.phone = "Format de numéro invalide (ex: 06 12 34 56 78 ou +33 6 12 34 56 78)"

    if (!formData.password) {
        errors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
        errors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!formData.acceptTerms) {
        errors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation';
    }

    setError(errors);
    return Object.keys(errors).length === 0;
}

const validatePhoneNumber = (phone: string): boolean => {
    if (!phone) return true; 

    const cleanPhone = phone.replace(/[\s\-\.\(\)]/g, '');

    const frenchMobileRegex = /^(?:\+33|0)[67](?:[0-9]{8})$/; 
    const frenchLandlineRegex = /^(?:\+33|0)[1-5](?:[0-9]{8})$/; 
    const internationalRegex = /^\+[1-9]\d{6,14}$/;

    return frenchMobileRegex.test(cleanPhone) ||
        frenchLandlineRegex.test(cleanPhone) ||
        internationalRegex.test(cleanPhone);
};

export default registerFormValidation;