import { ResetPasswordData, ResetPasswordFormErrors } from "@/app/(.public)/modules/auth/types";

export default function resetPasswordValidation(
  data: ResetPasswordData,
  setErrors: (errors: ResetPasswordFormErrors) => void
): boolean {
  const errors: ResetPasswordFormErrors = {};

  // Vérif mot de passe
  if (!data.password) {
    errors.password = "Le mot de passe est requis";
  } else if (data.password.length < 8) {
    errors.password = "Le mot de passe doit contenir au moins 8 caractères";
  } else if (!/(?=.*[a-z])/.test(data.password)) {
    errors.password = "Le mot de passe doit contenir une lettre minuscule";
  } else if (!/(?=.*[A-Z])/.test(data.password)) {
    errors.password = "Le mot de passe doit contenir une lettre majuscule";
  } else if (!/(?=.*\d)/.test(data.password)) {
    errors.password = "Le mot de passe doit contenir un chiffre";
  }

  // Vérif confirmation
  if (!data.confirmPassword) {
    errors.confirmPassword = "La confirmation du mot de passe est requise";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Les mots de passe ne correspondent pas";
  }

  setErrors(errors);

  // Retourne true si pas d'erreurs
  return Object.keys(errors).length === 0;
}