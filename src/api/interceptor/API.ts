"use client";

import axios, { AxiosError } from "axios";
import { fetchAccessToken, getAccessToken } from "../apis/auth/token.api";
import { checkAccessToken } from "@/utils/checkAccessToken";


/**
 * Axios 인스턴스 생성
 */
const API = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // 쿠키 및 인증정보 포함(refreshToken)
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 5초 타임아웃 설정
});




/**
 * 요청 인터셉터 (Request Interceptor)
 */
API.interceptors.request.use(
  (config) => {
      let accessToken = localStorage.getItem("accessToken");
      accessToken = checkAccessToken(accessToken); // ✅ 유효한 토큰을 다시 할당

      // ✅ accessToken이 유효할 경우에만 Authorization 헤더 추가
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config; // 잘못된 형식일 경우, 자동으로 걸러지고 요청에 포함되지 않음.
  },
  (error) => Promise.reject(error)
);




/**
 * 응답 인터셉터 (Response Interceptor)
 */
API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError | any) => {

      const originalRequest = error.config;

      // ❌ accessToken 만료 → Refresh Token으로 Access Token 갱신
      if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // 이미 재시도된 요청인지 확인 -> 무한 루프 방지

        try {
          console.log("🔄 Access Token 갱신 중...");        
          // 새 Access Token 요청
          const newAccessToken = await fetchAccessToken();
          console.log('새로 발급받은 액세스 토큰',newAccessToken);

          if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken)
            // 헤더 업데이트 후 요청 재시도
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return API(originalRequest); // 새로운 accessToken으로 요청 재시도
          }

        } catch (err) {
          console.error("❌ Refresh Token도 만료됨. 로그아웃 처리");
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
  }
);

export default API;
