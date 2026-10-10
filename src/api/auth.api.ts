import { apiClient } from "@/lib/api-client"
import { ChangePasswordValues, TConnectionRequestValues } from "@/validation"




export function userLogin({email,password}:{email:string,password:string}) {
    return apiClient("/auth/login",{method: "POST", body: { email, password }})
}

export function userLogout() {
    return apiClient("/auth/logout",{method: "POST"})
}   

export function getMe() {
    return apiClient("/auth/me",{method: "GET"})
}

export function sendConnectionRequest(payload:TConnectionRequestValues) {
    return apiClient("/connection-request",{method: "POST", body: payload})
}

export function verifyEmail(payload:{email:string,otp:number}) {
    return apiClient("/connection-request/email-verify",{method: "POST", body: payload})
}

export function resendEmailVerify(payload:{email:string}) {
    return apiClient("/connection-request/resend-email-verify",{method: "POST", body: payload})
}


export function forgotPassword(payload:{email:string}) {
    return apiClient("/auth/forgot-password",{method: "POST", body: payload})
}

export function resetPassword(payload:{email:string,otp:string,new_password:string}) {
    return apiClient("/auth/reset-password",{method: "POST", body: payload})
}

export function changePassword(payload:ChangePasswordValues) {
    return apiClient("/auth/change-password",{method: "PATCH", body: payload})
}


export function refreshToken(){
    return apiClient("/auth/refresh-token",{method: "POST"})
}
