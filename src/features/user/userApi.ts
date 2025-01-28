import API from "@/api/interceptor/API"
import { useMutation } from "@tanstack/react-query";

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
    console.log(data);
    return data;
}

// React Query 훅
export function useLoginWithEmail () {
    const mutation = useMutation({
        mutationFn: postLoginEmail,
        onSuccess: (data) => {
            console.log("성공적으로 전송됨:", data);
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