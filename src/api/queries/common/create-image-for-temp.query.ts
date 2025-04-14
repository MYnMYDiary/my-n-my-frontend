import API from "@/api/interceptor/API";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

/**
 * 이미지 개수 체크
 * @param formData - 이미지 파일 목록
 * @returns 이미지 개수
 */
const imageCountCheck = (formData: FormData) => {
    const imageList = formData.getAll('image');
    if(imageList.length > 10) {
        throw new Error('이미지는 최대 10개까지 선택 가능합니다.');
    }
    return true;
}

/**
 * 이미지를 temp 폴더에 업로드
 * 최대 10개까지 선택 가능
 * @param formData - 이미지 파일 목록
 * @returns 업로드된 이미지 파일
 */
const uploadImageForTemp = async (formData: FormData) => {
    try {

        imageCountCheck(formData);

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
        throw new Error('이미지 업로드 중 오류가 발생했습니다.');
    }
}

interface ImageListType {
    images: string[];
}

export function useUploadImageForTemp() {

    const [imageList, setImageList] = useState<ImageListType>({ images: [] });

    const mutation = useMutation({
        mutationFn: uploadImageForTemp,
        onSuccess: (data) => {
            setImageList({ images: data });
        },
        onError: (error:AxiosError) => {
            console.error('이미지 업로드 중 오류가 발생했습니다.', error.response?.data);
        },
    })

    const uploadImage = (formData: FormData) => {
        mutation.mutate(formData);
    }

    return {imageList, uploadImage};
}