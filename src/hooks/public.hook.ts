import { getAreas, getPackages } from "@/api";
import { useQuery } from "@tanstack/react-query";




export function useGetAreas() {
    return useQuery({
        queryKey: ["areas"],
        queryFn: getAreas,
    })
}

export function useGetPackages() {
    return useQuery({
        queryKey: ["packages"],
        queryFn: getPackages,
    })
}