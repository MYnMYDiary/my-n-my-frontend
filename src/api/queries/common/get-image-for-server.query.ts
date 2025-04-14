'use client'

import API from "@/api/interceptor/API";
import { useObjectUrl } from "@/hooks/image/useObjectUrl";
import { useQuery } from "@tanstack/react-query";


const getImageForServer = async (image: string) => {
    try {
        const response = await API.get(image, {
            responseType: 'blob'
        });

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const useGetImageForServer = (image: string) => {
    return useQuery({
        queryKey: ['imageForServer', image],
        queryFn: () => getImageForServer(image),
        enabled: !!image,
    });
}