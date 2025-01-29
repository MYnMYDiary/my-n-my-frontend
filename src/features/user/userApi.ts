import API from "@/api/interceptor/API"
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { useMutation } from "@tanstack/react-query";
import { setIsLogin } from "./userSlice";
import { useRouter } from "next/navigation";

export interface UserType {
    email: string;
    password: string;
}

// API 호출
const postLoginEmail = async ({email, password}:UserType) => {
    const { data } = await API.post(
        '/auth/login/email',
        {user: {email,password}}
    );

    // ✅ 로그인 성공 시 Access Token 저장
    localStorage.setItem("accessToken", data.accessToken);
    
    return data;
}

// React Query 훅
export function useLoginWithEmail () {

    const dispach = useAppDispatch(); //Redux
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: postLoginEmail,
        onSuccess: (data) => {
            console.log("성공적으로 전송됨:", data);
            dispach(setIsLogin(true)); //로그인 상태 true
            router.push('/') // 페이지 이동
        },
        onError: (error : any) => {
            console.error("에러 발생:", error);
            console.log(error?.response?.data?.message);
        },       
    })
    const login = (email:string, password:string) => {
        mutation.mutate({email, password});
    }

    return {login}
};