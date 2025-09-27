import {AxiosResponse} from "axios";
import { AuthData } from "./auth-data";


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
    acceptTerms: boolean;
    profilePicture: undefined | File;
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResetPasswordData {
    password: string;
    confirmPassword: string;
}

export interface AuthTypes {
    isLoading: boolean;
    error: string | null;
    login: (loginData: LoginData) => Promise<AxiosResponse<AuthData>>;
    register: (registerData: RegisterData) => Promise<AxiosResponse<AuthData>>;
    logout: (refreshToken: string) => Promise<void>;
    forgotPassword: (forgotPasswordData: ForgotPasswordData) => Promise<AxiosResponse<any, any> | unknown>;
    resetPassword: (resetPasswordData: ResetPasswordData, token: string) => Promise<AxiosResponse<any, any>>;
    clearError: () => void;
}