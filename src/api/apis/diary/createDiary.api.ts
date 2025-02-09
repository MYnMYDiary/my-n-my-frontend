'use client'

import API from "@/api/interceptor/API";

export const uploadImageApi = async (formData:FormData) => {
    console.log(formData?.get('image'));
    try {        
        const {data} = await API.post(
            '/common/image',
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data'},
                timeout: 10000,
            },
        )
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}