"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { LoginFormErrors } from "@/modules/auth/types";
import { LoginPayload } from "@/modules/auth/services/authService";
import loginFormValidation from "@/modules/auth/utils/LoginFormValidation";
import { useAuthStore } from "@/modules/auth/stores/useAuthStore";
import { Button } from "@/modules/auth/components/ui/button";

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginPayload>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [formErrors, setFormErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { loading, error, login } = useAuth();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormErrors({});

    if (!loginFormValidation(formData, setFormErrors)) return;

    try {
      const user = await login(formData);
      if (user) {
        setAuth(user, { accessToken: user.token, refreshToken: "" });
        router.push("/dashboard/");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name as keyof LoginFormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <div className="w-full lg:w-1/2 bg-[#2E2D4D] text-white flex flex-col justify-center items-start p-8 lg:px-16 lg:py-12 lg:rounded-3xl lg:my-6 lg:ml-6">
        <div className="max-w-md mx-auto lg:mx-0 w-full">
          <h1 className="text-4xl font-bold mb-6">Echo</h1>
          <h2 className="text-2xl font-semibold mb-4">
            Gérer vos campagnes publicitaires
          </h2>
          <p className="mb-8 text-lg">
            Gérez, suivez et optimisez vos campagnes sur notre réseau de VTC
          </p>

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
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 lg:p-8 space-y-6"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Connexion</h2>
            <p className="text-gray-600">
              Gérez votre application facilement et efficacement !
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                {error === "Invalid credentials"
                  ? "Email ou mot de passe incorrect"
                  : error === "User account is inactive"
                  ? "Compte utilisateur inactif"
                  : error}
              </p>
            </div>
          )}

          <div>
            {formErrors.email && (
              <p className="text-red-500 text-sm mb-1">{formErrors.email}</p>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
                placeholder="email@gmail.com"
                className="w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              />
            </div>
          </div>

          <div>
            {formErrors.password && (
              <p className="text-red-500 text-sm mb-1">
                {formErrors.password}
              </p>
            )}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 py-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Se souvenir de moi
              </span>
            </label>

            <Link
              href="/ForgotPassword"
              className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#2E2D4D] to-[#4A4970] text-white py-3 rounded-lg font-semibold hover:from-[#3E3D5D] hover:to-[#5A5970] transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:translate-y-0 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Connexion en cours...
          </div>
        ) : (
          "Se connecter"
        )}
      </Button>

          <p className="text-center text-gray-600 pt-4">
            Pas encore de compte ?{" "}
            <Link
              href="/Register"
              className="text-[#2E2D4D] font-semibold hover:text-[#4A4970] underline transition-colors"
            >
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
