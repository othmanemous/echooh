"use client";

import { useState } from "react";
import { authService, LoginPayload, ResetPasswordData } from "@/modules/auth/services/authService";
import { RegisterData } from "@/modules/auth/types";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validate = (payload: LoginPayload) => {
    if (!payload.email.trim()) {
      throw new Error("L'email est obligatoire");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      throw new Error("L'email n'est pas valide");
    }
    if (!payload.password.trim()) {
      throw new Error("Le mot de passe est obligatoire");
    }
    if (payload.password.length < 6) {
      throw new Error("Le mot de passe doit contenir au moins 6 caractères");
    }
  };

  const login = async (payload: LoginPayload) => {
    try {
      setLoading(true);
      setError(null);

      validate(payload);

      const user = await authService.login(payload);
      return user;
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: RegisterData) => {
    try {
      setLoading(true);
      setError(null);

      validate(payload);

      return await authService.register(payload);
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data: ResetPasswordData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await authService.resetPassword(data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { login, register, resetPassword, loading, error, success };
};
