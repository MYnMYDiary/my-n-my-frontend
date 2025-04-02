'use client'

import { PostDiaryType, uploadDiaryApi, uploadImageApi } from "@/api/apis/diary/createDiary.api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

/**
 * 이미지를 temp 폴더에 업로드
 * @returns 
 */
export function useUploadDiaryImage() {

    const [image, setImage] = useState<string>('')

    const mutation = useMutation({
        mutationFn: uploadImageApi,
        onSuccess: async(data) => {
            setImage('');
            setImage(data.fileName);
        },
        onError: (error : AxiosError) => {
            console.error("이미지 업로드 에러:", error);
            console.error('이미지 업로드 에러:', error.response?.data);
        },  
    })

    const uploadImage = (formData: FormData) => {
        mutation.mutate(formData);
    };

    return {image, uploadImage}
}


export function useUploadDiary() {

    const mutation = useMutation({
        mutationFn: uploadDiaryApi,
        onSuccess: async(data) => {
            return data;
        },
        onError: (error : AxiosError) => {
            console.error(error);
        },  
    })

    const uploadDiary = ({categoryId, year, month, title, content, image, tags}:PostDiaryType) => {
        mutation.mutate({categoryId, year, month, title, content, image, tags});
    };

    return {
        uploadDiary,
        isSuccess: mutation.isSuccess
    }
}