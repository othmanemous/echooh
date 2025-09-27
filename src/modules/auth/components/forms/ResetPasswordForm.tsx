'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { ResetPasswordData, ResetPasswordFormErrors } from "@/modules/auth/types";
import resetPasswordValidation from "@/modules/auth/utils/ResetPasswordValidation";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [tokenError, setTokenError] = useState('');

  const [formData, setFormData] = useState<ResetPasswordData>({
    password: '', 
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState<ResetPasswordFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const { error, isLoading, resetPassword } = useAuth();

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const labels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

    return {
      strength,
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || 'bg-gray-300'
    };
  };

  const isPasswordValid = (password: string) =>
    password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);

  const doPasswordsMatch = () =>
    formData.password !== '' && formData.password === formData.confirmPassword;

  const validateResetToken = (token: string) => {
    if (!token || token.length < 10) {
      setTokenError("Token de réinitialisation invalide ou expiré");
      return false;
    }
    return true;
  };

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setTokenError('Lien de réinitialisation manquant');
      setIsValidating(false);
      return;
    }
    const isValid = validateResetToken(token);
    setIsValidToken(isValid);
    setIsValidating(false);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = resetPasswordValidation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      const token = searchParams.get('token') || "";
      await resetPassword(formData, token);
      setSuccess(true);

      setTimeout(() => {
        router.push('/login?message=password-reset-success');
      }, 2000);

    } catch (err) {
      console.error("Erreur lors de la réinitialisation :", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name as keyof ResetPasswordFormErrors];
      return newErrors;
    });
  };

  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification du lien...</p>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Lien invalide</h3>
          <p className="text-red-700 mb-4">{tokenError}</p>
          <a
            href="/ForgotPassword"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Demander un nouveau lien
          </a>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center max-w-md w-full">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">Mot de passe modifié !</h3>
          <p className="text-green-700 mb-4">Votre mot de passe a été mis à jour avec succès.</p>
          <p className="text-sm text-green-600">Redirection vers la page de connexion...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <div className="w-full lg:w-1/2 bg-[#2E2D4D] text-white flex flex-col justify-center items-start p-8 lg:px-16 lg:py-12 lg:rounded-3xl lg:my-6 lg:ml-6">
        <div className="max-w-md mx-auto lg:mx-0 w-full">
          <h1 className="text-4xl font-bold mb-6">Echo</h1>
          <h2 className="text-2xl font-semibold mb-4">Gérer vos campagnes publicitaires</h2>
          <p className="mb-8 text-lg">Gérez, suivez et optimisez vos campagnes sur notre réseau de VTC</p>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 bg-white p-2 rounded-xl">
                <img src="/client.png" alt="Suivi" className="w-10 h-10" />
              </div>
              <div>
                <p className="font-semibold">Suivi en temps réel</p>
                <span className="text-sm opacity-90">
                  Performance et analytics détaillés
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 bg-white p-2 rounded-xl">
                <img src="/ciblage.png" alt="Ciblage" className="w-10 h-10" />
              </div>
              <div>
                <p className="font-semibold">Ciblage précis</p>
                <span className="text-sm opacity-90">
                  Zone géographique précise
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 bg-white p-2 rounded-xl">
              <img src="/taxi.png" alt="Réseau" className="w-10 h-10" />
              </div>
              <div>
                <p className="font-semibold">Réseau étendu</p>
                <span className="text-sm opacity-90">
                  Plus de 1000 véhicules partenaires
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center py-8 lg:py-0 px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 lg:p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Réinitialiser le mot de passe
            </h2>
            <p className="text-gray-600">
              Choisissez un nouveau mot de passe sécurisé
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nouveau mot de passe *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="password" 
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                    formErrors.password
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
              )}

              {formData.password && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Force du mot de passe:</span>
                    <span className="text-xs font-medium text-gray-700">
                      {getPasswordStrength(formData.password).label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrength(formData.password).color}`}
                      style={{ width: `${(getPasswordStrength(formData.password).strength / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                    formErrors.confirmPassword
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {formErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
              )}

              {formData.confirmPassword && (
                <div className="mt-2 flex items-center gap-2">
                  {doPasswordsMatch() ? (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Les mots de passe correspondent</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>Les mots de passe ne correspondent pas</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !isPasswordValid(formData.password) || !doPasswordsMatch()}
              className="w-full bg-gradient-to-r from-[#2E2D4D] to-[#4A4970] text-white py-3 rounded-lg font-semibold hover:from-[#3E3D5D] hover:to-[#5A5970] transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
            >
              {isLoading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}