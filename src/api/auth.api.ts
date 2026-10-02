import { apiClient } from "@/lib/api-client"



export function userLogin({email,password}:{email:string,password:string}) {
    return apiClient("/auth/login",{method: "POST", body: { email, password }})
}

