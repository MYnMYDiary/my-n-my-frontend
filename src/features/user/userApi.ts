"use client";

import API from "@/api/interceptor/API"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setIsLogin } from "./userSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux/hooks";

export interface UserType {
    email: string;
    password: string;
}

// API 호출
const loginwithEmail = async ({email, password}:UserType) => {
    const { data } = await API.post(
        '/auth/login/email',
        {user: {email,password}}
    );
    return data;
}

export const logoutApi = async () => {
    const { data } = await API.post(
        '/auth/logout'
    );
    return data;
}

// React Query 훅
export function useLoginWithEmail () {
    const dispatch = useAppDispatch(); 
    const router = useRouter();

    const login = (email:string, password:string) => {
        mutation.mutate({email, password});
    }

    const mutation = useMutation({
        mutationFn: loginwithEmail,
        onSuccess: async(data) => {
            localStorage.setItem('accessToken', data.accessToken)
            dispatch(setIsLogin(true));
            await router.push('/') // 페이지 이동
        },
        onError: (error : any) => {
            console.error("에러 발생:", error);
            console.log(error?.response?.data?.message);
        },       
    })

    return {login}
};