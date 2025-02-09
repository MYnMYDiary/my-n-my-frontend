// /app/api/auth/token/route.ts (Next.js API Route)
import axios from "axios";
import { logout } from "../user/login.api";


export async function fetchAccessToken() {
    try {
        const res = await fetch("http://localhost:8080/auth/token/access", {
            method: "POST",
            credentials: "include", // RefreshToken 포함
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.status === 401) {
            console.log("로그인이 만료되었습니다.");
            logout();
            throw new Error("Unauthorized");
        }

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return data.accessToken;
    } catch (error) {
        console.error("AccessToken 요청 실패:", error);
        throw error;
    }
}


/**
 * 클라이언트 -> 백엔드 API 요청
 * acceToken 요청 API
 * Interceptor를 거치지 않음
 * @returns accessToken
 */
export async function getAccessToken() {

    try {
        const { data } = await axios.post(
            "http://localhost:8080/auth/token/access",
            {}, // Body 없이 요청
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, // 쿠키 자동으로 포함 :Refresh Token
                timeout: 5000, // 5초 타임아웃 설정
            },
        );
        console.log("✅ 요청된 쿠키:", document.cookie); // 브라우저에서 쿠키 확인
        return data.accessToken;
    } 
    catch (error: any) {
        if (error.response?.status === 401) {
            console.log(error.response);
        }
        throw error;
    }
}
