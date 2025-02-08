
import API from "@/api/\bclientApi/interceptor/API";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

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

export const saveDiaryImage = async() => {
    try {
        const {data} = await API.post(
            '/diary',
            {
                
            }
        )
    } catch (error) {
        
    }
}


/**
 * 이미지를 temp 폴더에 업로드
 * @returns 
 */
export function useUploadDiaryImage() {

    const [image, setImage] = useState<string>('')

    const uploadImage = (formData: FormData) => {
        mutation.mutate(formData);
    }

    const mutation = useMutation({
        mutationFn: uploadImageApi,
        onSuccess: async(data) => {
            setImage(data.fileName);
        },
        onError: (error : AxiosError) => {
            console.error("이미지 업로드 에러:", error);
            console.error('이미지 업로드 에러:', error.response?.data);
        },  
    })

    return {image, uploadImage}
}