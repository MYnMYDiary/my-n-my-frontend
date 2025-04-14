'use client'

import API from "@/api/interceptor/API";
import { useQuery } from "@tanstack/react-query";


const getMarketProducts = async (marketId: number, categoryId?: string) => {
    try {
        const { data } = await API.get(`/market/product/${marketId}`, {
            params: categoryId ? { category: categoryId } : {}
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * 마켓 상품 조회
 */
export const useGetMarketProducts = (marketId: number, categoryId?: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['marketProducts', categoryId],
        queryFn: () => getMarketProducts(marketId, categoryId),
    });

    return { data, isLoading, error };
}