'use client'

import API from "@/api/interceptor/API";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface createMarketProductType {
    categoryId: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    isSale: boolean;
    images: string[];
}

// api/market/product
const createMarketProductApi = async (marketProductData: createMarketProductType) => {
    try {
        const data = await API.post('/market/product', marketProductData);
        return data;
    } catch (error) {
        throw error;
    }
}

export const useCreateMarketProduct = () => {

    const router = useRouter();

    const mutation = useMutation({
        mutationFn: createMarketProductApi,
        onSuccess: (data) => {
            console.log('상품 등록 성공: ', data);
            router.replace('/artist/market');
        },
        onError: (error) => {
            console.error(error);
        },
    }); 

    const createMarketProduct = (marketProductData: createMarketProductType) => {
        mutation.mutate(marketProductData);
    }

    return { createMarketProduct };
}   