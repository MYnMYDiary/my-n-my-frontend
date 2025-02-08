import API from "@/api/\bclientApi/interceptor/API";
import axios from "axios";

/**
 * 클라이언트 컴포넌트 -> 백엔드 서버
 * Axios 로그인 요청 API
 * @param {string} email
 *  @param {string} password
 * @returns acessToken
 */
export const loginwithEmail = async ({email, password}: {email:string, password: string}) => {
    const { data } = await API.post(
        '/auth/login/email',
        {user: {email,password}}
    );
    return data; //acessToken
}

/**
 * 로그아웃 요청 API
 * @returns
 */
export const logoutApi = async () => {
    const { data } = await axios.post(
        '/auth/logout',
        {},
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // Refresh Token 쿠키 포함
            timeout: 5000, // 5초 타임아웃 설정
        }
    );
    return data;
}