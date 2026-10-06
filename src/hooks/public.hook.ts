import { getAreas, getPackages } from "@/api";
import { useQuery } from "@tanstack/react-query";




export function useGetAreas() {
    return useQuery({
        queryKey: ["areas"],
        queryFn:async () => {
            const data = await getAreas()
            return data?.data
        },
    })
}

export function useGetPackages() {
    return useQuery({
        queryKey: ["packages"],
        queryFn: async()=>{
            const data = await getPackages()
            return data?.data
        },
    })
}