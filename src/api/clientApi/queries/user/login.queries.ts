'use client'

import { loginwithEmail } from "@/api/clientApi/apis/user/login.api";
import { useMutation } from "@tanstack/react-query";
import { useState } from 'react';
import { useGetAccessToken } from "../auth/auth.queries";

/**
 * 로그인 요청 쿼리(클라이언트 컴포넌트)
 * @returns 
 */
export function useLoginWithEmail () {

    const login = (email:string, password:string) => {
        mutation.mutate({email, password});
    }

    const mutation = useMutation({
        mutationFn: loginwithEmail,
        onSuccess: async(data) => {
            console.log(data);
            //엑세스 토큰을 로컬 스토리지에 저장
            localStorage.setItem('accessToken', data.accessToken);
            //리프레쉬 토큰은 쿠키에 저장됨

        },
        onError: (error : any) => {
            console.error("에러 발생:", error);
            console.log(error?.response?.data?.message);
        },    
    })

    return {login}
};