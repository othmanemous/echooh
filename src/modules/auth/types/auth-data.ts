export interface TokenPairData {
    accessToken: string;
    refreshToken: string;
}

export interface UserProfileData {
    id: string;
    email: string;
    phone?: string | null;
    role: 'ADMIN' | 'ADVERTISER' | 'DRIVER';
    firstName?: string | null;
    lastName?: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    profilePictureUrl?: string | null;
    advertiser?: any;
}


export interface AuthData {
    tokenPair: TokenPairData;
    user: UserProfileData;
}