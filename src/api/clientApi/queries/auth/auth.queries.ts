"use client";

import { getAccessToken } from "@/api/clientApi/apis/auth/token.api";
import { useMutation } from "@tanstack/react-query";
import { access } from "fs";
import { useEffect, useState } from "react";

/**
 * 엑세스 토큰을 요청하는 리액트쿼리 훅
 * @returns 
 */
export function useGetAccessToken() {

    const mutation = useMutation({
        mutationFn: getAccessToken,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error:any) => {
            console.log(error.response.data.message);
            console.log('로그아웃 상태');
        }
    })

    return {
        state:{
            accessToken: mutation.data,
            isLogin: mutation.isSuccess, // 로그인 여부를 React Query에서 가져오기
            isLoading: mutation.isPending, // API 요청 중인지 확인
            error: mutation.error, // 에러 확인
        },
        getToken: mutation.mutate
    };
}