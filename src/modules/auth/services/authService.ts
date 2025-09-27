import type { RegisterPayload, User } from "@/modules/auth/types";

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
  
}

export interface ResetPasswordData {
  email: string;
  newPassword: string;
  confirmPassword: string;
  isLoading: boolean;
}

export const authService = {
  async login(payload: LoginPayload): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (payload.email === "othmane@gmail.com" && payload.password === "123456") {
          resolve({
            id: "1",
            username: "Othmane",
            email: payload.email,
            token: "fake-jwt-token-123456",
          });
        } else {
          reject(new Error("Email ou mot de passe invalide"));
        }
      }, 1000);
    });
  },

  async register(payload: RegisterPayload): Promise<User> {
    if (!payload.email.endsWith("@gmail.com")) {
      throw new Error("Seuls les emails Gmail sont acceptés (test)");
    }
    if (payload.password !== payload.confirmPassword) {
      throw new Error("Les mots de passe ne correspondent pas");
    }
    if (!payload.acceptTerms) {
      throw new Error("Vous devez accepter les conditions");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      id: "2",
      username: `${payload.name} ${payload.prenom}`, 
      email: payload.email,
      token: "fake-jwt-token-register-7890",
    };
  },

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email === "othmane@gmail.com") {
          resolve({ message: "Mot de passe réinitialisé avec succès (test)" });
        } else {
          reject(new Error("Utilisateur introuvable (test)"));
        }
      }, 1000);
    });
  },
};
