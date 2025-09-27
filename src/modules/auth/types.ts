export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordFormErrors {
  password?: string;
  confirmPassword?: string;

}
export interface RegisterFormErrors {
    name?: string;
    prenom?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    profilePicture?: string;
    acceptTerms?: string;

}

export interface ForgotPasswordData {
    email: string;
}

export interface ForgotPasswordFormErrors {
    email?: string;
}

export interface ResetPasswordData {
    password: string;
    confirmPassword: string;
    isLoading: boolean;

}

export interface ResetPasswordFormErrors {
    password?: string;
    confirmPassword?: string;
    general?: string;

}

export interface TokenPayload {
    user_id: string;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
    sub: string;
    jti: string;
    roles: string[];
    permissions: string[];
    [key: string]: any;

}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;

}

export interface RegisterData { 
  name: string;
  prenom: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  profilePicture?: File | null;
  acceptTerms: boolean;
  
}

export type RegisterPayload = RegisterData;

export interface RegisterFormErrors {
  name?: string;
  prenom?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  token: string;
}