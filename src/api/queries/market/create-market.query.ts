'use client'

import API from "@/api/interceptor/API";
import { useMutation } from "@tanstack/react-query";

interface createMarketType {
    image: string;
    name: string;
    introduction: string;
    notice: string;
    startDate: string | null;
    endDate: string | null;
    isOpen: boolean;
}

// api/market
const createMarketApi = async (marketData: createMarketType) => {
    try {
        const data = await API.post('/market', marketData);
        return data;
    } catch (error) {
        throw error;
    }
}

/**
 * 마켓 생성
 * @returns 
 */
export function useCreateMarket() {
    const mutation = useMutation({
        mutationFn: createMarketApi,
        onSuccess: (data) => {
            return data;
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const createMarket = (marketData: createMarketType) => {
        mutation.mutate(marketData);
    }

    return { createMarket };
}