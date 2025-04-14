'use client'

import API from "@/api/interceptor/API";
import { useQuery } from "@tanstack/react-query";

/**
 * 마켓 조회 API
 */
const getMarket = async () => {
    try {
        const { data } = await API.get('/market');
        return data;
    } catch (error) {
        console.log(error);
    }

};

export const useGetMarket = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['market'],
        queryFn: () => getMarket(),
    });

    return { data, isLoading, error };
};
