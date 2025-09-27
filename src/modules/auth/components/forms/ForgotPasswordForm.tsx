"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { ForgotPasswordData, ForgotPasswordFormErrors } from "@/modules/auth/types"
import forgotPasswordFormValidation from "@/modules/auth/utils/ForgotPasswordFormValidation"
import { useAuth } from "@/modules/auth/hooks/useAuth"
import { Mail, ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"

const ForgotPasswordForm = () => {
    const [formData, setFormData] = useState<ForgotPasswordData>({
        email: "",
    })

    const [formErrors, setFormErrors] = useState<ForgotPasswordFormErrors>({})
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [cooldownTime, setCooldownTime] = useState<number>(0)
    const [isInCooldown, setIsInCooldown] = useState<boolean>(false)
    const { error, isLoading, forgotPassword } = useAuth()

    useEffect(() => {
        const storedTimestamp = localStorage.getItem("forgot-password-cooldown")
        if (storedTimestamp) {
            const timestamp = Number.parseInt(storedTimestamp)
            const now = Date.now()
            const elapsed = Math.floor((now - timestamp) / 1000)
            const remaining = 60 - elapsed

            if (remaining > 0) {
                setCooldownTime(remaining)
                setIsInCooldown(true)
            } else {
                localStorage.removeItem("forgot-password-cooldown")
            }
        }
    }, [])

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isInCooldown && cooldownTime > 0) {
            interval = setInterval(() => {
                setCooldownTime((time) => {
                    if (time <= 1) {
                        setIsInCooldown(false)
                        localStorage.removeItem("forgot-password-cooldown")
                        return 0
                    }
                    return time - 1
                })
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isInCooldown, cooldownTime])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setFormErrors({})

        if (!forgotPasswordFormValidation(formData, setFormErrors)) return

        try {
            await forgotPassword(formData)
            setIsSubmitted(true)
            setCooldownTime(60)
            setIsInCooldown(true)
            localStorage.setItem("forgot-password-cooldown", Date.now().toString())
        } catch (e) {
            console.error("Forgot password error:", e)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        if (formErrors[name as keyof ForgotPasswordFormErrors]) {
            setFormErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }))
        }
    }

    if (isSubmitted) {
        return (
            <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email envoyé !</h3>
                <p className="text-gray-600 mb-6">
                    Nous avons envoyé un lien de réinitialisation à <strong>{formData.email}</strong>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                    Vérifiez votre boîte de réception et cliquez sur le lien pour réinitialiser votre mot de passe.
                </p>

                {isInCooldown ? (
                    <div className="mb-6">
                        <div className="flex items-center justify-center gap-2 text-orange-600 mb-3">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">Vous pourrez renvoyer un email dans {cooldownTime} secondes</span>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="mb-6 text-blue-600 hover:text-blue-500 font-medium transition-colors text-sm"
                    >
                        Renvoyer l'email
                    </button>
                )}

                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 font-medium transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour à la connexion
                </Link>
            </div>
        )
    }

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
    <div className="w-full max-w-md p-6 lg:p-8 space-y-6">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 
                      1.414L8.586 10l-1.293 1.293a1 1 0 
                      101.414 1.414L10 11.414l1.293 1.293a1 
                      1 0 001.414-1.414L11.414 10l1.293-1.293a1 
                      1 0 00-1.414-1.414L10 8.586 8.707 
                      7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Adresse email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
                className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="votre@email.com"
              />
            </div>
            {formErrors.email && (
              <p className="mt-1 text-xs text-red-600">{formErrors.email}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || isInCooldown}
            className="w-full bg-gradient-to-r from-[#2E2D4D] to-[#4A4970] hover:from-[#3E3D5D] 
            hover:to-[#5A5970] disabled:opacity-50 text-white font-semibold py-2.5 px-4 
            rounded-lg transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="text-sm">Envoi en cours...</span>
              </div>
            ) : isInCooldown ? (
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Attendre {cooldownTime}s</span>
              </div>
            ) : (
              "Envoyer le lien de réinitialisation"
            )}
          </button>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la connexion
            </Link>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Email envoyé !
          </h3>
          <p className="text-gray-600 mb-6">
            Nous avons envoyé un lien de réinitialisation à{" "}
            <strong>{formData.email}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Vérifiez votre boîte de réception et cliquez sur le lien pour
            réinitialiser votre mot de passe.
          </p>

          {isInCooldown ? (
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 text-orange-600 mb-3">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Vous pourrez renvoyer un email dans {cooldownTime} secondes
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsSubmitted(false)}
              className="mb-6 text-blue-600 hover:text-blue-500 font-medium transition-colors text-sm"
            >
              Renvoyer l'email
            </button>
          )}

          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la connexion
          </Link>
        </div>
      )}
    </div>
  </div>
</div>

    )
}

export default ForgotPasswordForm
