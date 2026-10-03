import { apiClient } from "@/lib/api-client";



export function getAreas() {
    return apiClient("/areas",{method: "GET"})
}

export function getPackages(){
    return apiClient("/packages",{method: "GET"})
}