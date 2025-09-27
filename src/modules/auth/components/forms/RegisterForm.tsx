"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/modules/auth/hooks/useAuth"
import { useAuthStore } from "@/modules/auth/stores/useAuthStore"
import type { RegisterPayload } from "@/modules/auth/services/authService"
import type { RegisterFormErrors } from "@/modules/auth/types"
import registerFormValidation from "@/modules/auth/utils/RegisterFormValidation"
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react"

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterPayload>({
    name: "",
    prenom: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    profilePicture: undefined,
  })
  const [formErrors, setFormErrors] = useState<RegisterFormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register, error, loading } = useAuth()
  const { setAuth } = useAuthStore()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    if (formErrors[name as keyof RegisterFormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormErrors({})
    if (!registerFormValidation(formData, setFormErrors)) return

    try {
      const user = await register(formData)
      if (user) {
        setAuth(user, user.token)
        router.push("/dashboard")
      }
    } catch {
      console.error("Erreur lors de l'inscription")
    }
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
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-6 lg:p-8 space-y-4"
        >
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Créer un compte</h2>
            <p className="text-gray-600">Rejoignez-nous pour gérer vos campagnes facilement !</p>
          </div>

          <div>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="text"
                name="name"
                placeholder="Nom"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>

          <div>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            {formErrors.prenom && <p className="text-red-500 text-sm">{formErrors.prenom}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  placeholder="email@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
            </div>
            <div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="0600000000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmez le mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-3 py-2">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              className="mt-1 rounded focus:ring-blue-500 text-blue-600"
            />
            <span className="text-sm text-gray-600 flex-1">
              J'accepte la{" "}
              <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                politique de confidentialité & conditions
              </a>
            </span>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#2E2D4D] to-[#4A4970] text-white py-3 rounded-lg font-semibold hover:from-[#3E3D5D] hover:to-[#5A5970] transition-all duration-200"
          >
            {loading ? "Création du compte..." : "Créer mon compte"}
          </button>

          <p className="text-center text-gray-600 pt-4">
            Déjà inscrit ?{" "}
            <a href="/login" className="text-blue-600 font-semibold hover:text-blue-800 underline">
              Se connecter
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
