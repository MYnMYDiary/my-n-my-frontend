'use client'

import axios from "axios";

export async function fetchLoginEmail(data: { user: { email: string; password: string } }) {
    try {
        const res = await axios.post(
            "/api/auth/login", //route.ts의 파일 경로
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, // 쿠키 자동으로 포함 :Refresh Token
                timeout: 5000, // 5초 타임아웃 설정
            }
        );
        console.log(res);
        return res; // ✅ accessToken을 반환 (localStorage에 저장 가능)
    } catch (error) {
        console.error("Login failed:", error);
        throw new Error("Login failed");
    }
}