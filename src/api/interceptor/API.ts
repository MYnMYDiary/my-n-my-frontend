import axios from "axios";

// Axios 인스턴스 생성
const API = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // 쿠키 및 인증정보 포함
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 5초 타임아웃 설정
});

// 요청 인터셉터 (Request Interceptor)
API.interceptors.request.use(
  // Access Token 자동 추가)
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (Response Interceptor)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // ❌ 401 오류 (토큰 만료 시) → Refresh Token으로 Access Token 갱신
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log("🔄 Access Token 갱신 중...");
        
        // Refresh Token을 사용하여 새 Access Token 요청
        const res = await axios.post("http://localhost:8080/auth/refresh", {}, { withCredentials: true });

        // 새 Access Token 저장
        const newToken = res.data.accessToken;
        localStorage.setItem("accessToken", newToken);

        // 기존 요청 헤더 업데이트 후 재요청
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API(originalRequest);
      } catch (err) {
        console.error("🚨 토큰 갱신 실패, 로그인 페이지로 이동");
        localStorage.removeItem("accessToken"); // 토큰 삭제
        window.location.href = "/login"; // 로그인 페이지로 이동
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
