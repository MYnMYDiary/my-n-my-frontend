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