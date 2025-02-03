import { getNewAccessToken } from "@/features/auth/authApi";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";


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

const queryClient = new QueryClient();

/**
 * 요청 인터셉터 (Request Interceptor)
 */
API.interceptors.request.use(
  // Access Token 자동 추가)
  (config) => {
    const accessToken = queryClient.getQueryData<string>(['accessToken']);
    console.log(accessToken);
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);




/**
 * 응답 인터셉터 (Response Interceptor)
 */
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // ❌ accessToken 만료 → Refresh Token으로 Access Token 갱신
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 무한 루프 방지
      try {
        console.log("🔄 Access Token 갱신 중...");
        
        // 새 Access Token 저장
        const newAccessToken = await getNewAccessToken();

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return API(originalRequest); // 새로운 accessToken으로 요청 재시도
        }

      } catch (err) {
        console.error("🚨 토큰 갱신 실패, 로그인 페이지로 이동");
        //window.location.href = "/login"; // 로그인 페이지로 이동
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
