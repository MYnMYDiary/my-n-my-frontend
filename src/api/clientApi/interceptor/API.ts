"use client";

import axios, { AxiosError } from "axios";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getAccessToken } from "../apis/auth/token.api";


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

    // accessToken 검증 (string인지 확인)
    if (typeof accessToken !== "string" || !accessToken.trim()) {
      console.warn("유효하지 않은 accessToken:", accessToken);
      return config; // 토큰이 없으면 헤더 추가 없이 반환
    }

    try {
      // JSON 형태로 잘못 저장된 경우 대비
      if (accessToken.startsWith("{") || accessToken.startsWith("[")) {
        accessToken = JSON.parse(accessToken);
      }
    } catch (error) {
      console.error("accessToken 파싱 실패:", error);
      return config;
    }

    // JWT 형식인지 확인하는 정규식 (대략적인 체크)
    const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
    if (accessToken && !jwtPattern.test(accessToken)) {
      console.warn("올바르지 않은 JWT 형식의 accessToken:", accessToken);
      return config; // 유효하지 않으면 헤더 추가 안 함
    }

    console.log("요청 accessToken:", accessToken);
    config.headers.Authorization = `Bearer ${accessToken}`;

    // 잘못된 형식일 경우, 자동으로 걸러지고 요청에 포함되지 않음.
    return config;
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
    console.log(originalRequest);
    
    // ❌ accessToken 만료 → Refresh Token으로 Access Token 갱신
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 이미 재시도된 요청인지 확인 -> 무한 루프 방지
      try {
        console.log("🔄 Access Token 갱신 중...");
        
        // 새 Access Token 요청
        const newAccessToken = await getAccessToken()
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
