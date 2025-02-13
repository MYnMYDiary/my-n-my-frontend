'use client'

import API from "@/api/interceptor/API";

export interface DiaryType{
    title:string,
    content:string,
    image: string
}

/**
 * 모든 다이어리를 가져오는 API 호출 함수
 * @returns 
 */
export const getAllDiarys = async () => {
    const { data } = await API.get("/diary");
    return data;
};

/**
 * 유저의 다이어리를 가져오는 API 호출 함수
 * @param category 
 * @returns 
 */
export const getDiaryByUser = async (category:string) => {
    try {        
        const { data } = await API.post(
            '/diary/mydiary',
            {category}
        );
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getDiaryImage = async (image: string) => {
    try {
        const response = await API.get(image, {
            responseType: 'blob'
        });
        
        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
};