'use client'

import { uploadImageApi } from "@/api/apis/diary/createDiary.api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

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