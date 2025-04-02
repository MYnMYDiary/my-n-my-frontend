'use client'

import API from "@/api/interceptor/API";

/**
 * 이미지를 temp 폴더에 업로드
 * @param formData - 이미지 파일
 * @returns 업로드된 이미지 파일
 */
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

/**
 * 다이어리 업로드
 * @param diary - 다이어리 정보
 * @returns 업로드된 다이어리 정보
 */
export interface PostDiaryType{
    categoryId: string;
    title: string;
    content: string;
    image: string;
    year: string;
    month: string;
    tags: string[];
}

export const uploadDiaryApi = async ({categoryId, title, content, image, year, month, tags}:PostDiaryType) => {
    try {
        const {data} = await API.post(
            '/diary',
            {categoryId, title, content, image, year, month, tags}
        )
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}