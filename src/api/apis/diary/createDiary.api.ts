'use client'

import API from "@/api/interceptor/API";

export const uploadImageApi = async (formData:FormData) => {
    try {        
        const {data} = await API.post(
            '/common/image',
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data'},
                timeout: 10000,
            },
        )
        return data;
    } catch (error) {
        return error;
    }
}

export interface PostDiaryType{
    categoryId: string;
    title: string;
    content: string;
    image: string;
    year: string;
    month: string;
}

export const uploadDiaryApi = async ({categoryId, title, content, image, year, month}:PostDiaryType) => {
    try {
        const {data} = await API.post(
            '/diary',
            {categoryId, title, content, image, year, month}
        )
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}