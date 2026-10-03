import { apiClient } from "@/lib/api-client"
import { ConnectionRequestValues } from "@/validation"



export function userLogin({email,password}:{email:string,password:string}) {
    return apiClient("/auth/login",{method: "POST", body: { email, password }})
}

export function userLogout() {
    return apiClient("/auth/logout",{method: "POST"})
}   

export function getMe() {
    return apiClient("/auth/me",{method: "GET"})
}

export function sendConnectionRequest(payload:ConnectionRequestValues) {
    return apiClient("/connection-request",{method: "POST", body: payload})
}



