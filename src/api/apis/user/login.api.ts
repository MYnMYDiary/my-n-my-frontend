'use client'

import axios from "axios";

/**
 * 클라이언트 -> 라우트 핸들러 -> 백엔드 서버
 * 로그인 요청 API
 * @param Object user{email,password} : 라우트 핸들러가 객체(body)만 받음
 * @returns accessToken
 */
export async function loginWithEmail(body: { user: { email: string; password: string } }) {
    try {
        const data = await axios.post(
            "/api/auth/login", //route.ts의 파일 경로
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, // 쿠키 자동으로 포함 :Refresh Token
                timeout: 5000, // 5초 타임아웃 설정
            }
        );
        return data.data?.accessToken; // ✅ accessToken을 반환 (localStorage에 저장 가능)
    } catch (error) {
        console.error("Login failed:", error);
        throw new Error("Login failed");
    }
}



/**
 * 로그아웃 요청 API
 * 라우트 핸들러
 * @returns Promise<boolean>
 */
// export const logout = async (): Promise<boolean> => {
//     try {
//         const res = await fetch('http://localhost:8081/auth/logout');
//
//         if (!res.ok) {
//             throw new Error("로그아웃 요청 실패");
//         }
//
//         const data = await res.json();
//         localStorage.clear();
//
//         return Boolean(data.isLogin);
//     } catch (error) {
//         console.error("로그아웃 에러:", error);
//         return false;
//     }
// };

export const logout = async (): Promise<boolean> => {
    try {
        const res = await fetch('http://localhost:8081/auth/logout', {
            method: 'POST',
            credentials: 'include', // 🔥 refreshToken 쿠키 전송을 위해 꼭 필요!
        });

        if (!res.ok) {
            throw new Error("로그아웃 요청 실패");
        }

        localStorage.clear(); // accessToken 등 제거

        return true;
    } catch (error) {
        console.error("로그아웃 에러:", error);
        return false;
    }
};