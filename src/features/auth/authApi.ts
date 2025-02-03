import API from "@/api/interceptor/API"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface AuthInfoType{
    email: string,
    password: string,
    nickname:string,
    code: string
}

// 🚀 로그아웃 함수
const logout = () => {
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // RefreshToken 삭제
    localStorage.removeItem('accessToken'); // AccessToken 삭제
};

// 이메일로 인증번호를 발송하는 API 호출 함수
const sendAuthEmail = async ({email}:Pick<AuthInfoType,'email'>) => {
    const {data} = await API.post(
        '/auth/send-email',
        {email}
    );
    return data;
}

// 인증번호를 확인하는 API
const verityEmail = async ({email, code}:Pick<AuthInfoType,'email'|'code'>) => {
    const {data} = await API.post(
        '/auth/verify-email',
        {email, code}
    );
    return data;
}

// accessToken 재발급 API
export const getNewAccessToken = async () => {
    try {
        const {data} = await API.post('/auth/token/access',{}) // Body 필요없음
        return {data};       
    } catch (error: any) {
        if (error.response?.status === 401) {
            alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
            // logout(); // 로그아웃 함수 호출
        }
        throw error;
    }
}

const joinWithEmail = async ({email, password, nickname}:Pick<AuthInfoType,'email'|'password'|'nickname'>) => {
    const {data} = await API.post(
        '/auth/join/email',
        {user:{email, password, nickname}}
    );
    return data;
}

// React Query 훅
export function useSendAuthEmail() {
    const mutation = useMutation({
        mutationFn: sendAuthEmail,
        onSuccess: (data) => {
            alert(data.message);
        },
        onError: (error:any) => {
            console.log("에러: ", error);
        }
    })

    const sendEmail = ({email}:Pick<AuthInfoType,'email'>) => {
        mutation.mutate({email});
    }

    return {sendEmail};
}

/**
 * 인증번호 확인
 * @returns 
 */
export function useVerityEmail() {
    const [isSuccess, setIsSuccess] = useState<boolean>();

    const mutation = useMutation({
        mutationFn: verityEmail,
        onSuccess: (data) => {
            console.log(data);
            setIsSuccess(true);
        },
        onError: (error:any) => {
            console.log("에러: ", error);
            setIsSuccess(false);
            alert(error.response.data.message);
        }
    })

    const sendVerifyCode = ({email, code}:Pick<AuthInfoType,'email'|'code'>) => {
        mutation.mutate({email, code});
    }

    return {sendVerifyCode, isSuccess};
}

/**
 * 이메일로 회원가입
 * @returns sendVerifyCode, isSuccess
 */
export function useJoinWithEmail() {

    // 페이지 이동
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: joinWithEmail,
        onSuccess: (data) => {
            router.push('/');
            console.log(data);
        },
        onError: (error:any) => {
            console.log("에러: ", error);
            alert(error.response.data.message);
        }
    })

    const joinEmail = ({email, password, nickname}:Pick<AuthInfoType,'email'|'password'|'nickname'>) => {
        mutation.mutate({email, password, nickname});
    }

    return {joinEmail};
}