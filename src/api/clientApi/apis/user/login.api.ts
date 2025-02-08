
import axios from "axios";

/**
 * 클라이언트 컴포넌트 -> 백엔드 서버
 * Axios 로그인 요청 API
 * @param {string} email
 *  @param {string} password
 * @returns acessToken
 */
export const loginwithEmail = async ({email, password}: {email:string, password: string}) => {
    try {        
        const { data } = await axios.post(
            'http://localhost:8080"/auth/login/email', //url
            {user: {email,password}}, //Body
            {
                headers:{ "Content-Type": "application/json",},
                withCredentials: true, // 쿠키 자동으로 포함 :Refresh Token
                timeout: 5000, // 5초 타임아웃 설정
            }
        );
        return data;
    } 
    catch (error) {
        
    }
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