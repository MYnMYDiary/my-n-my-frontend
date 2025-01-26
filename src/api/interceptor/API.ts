import axios from "axios";

// Axios 인스턴스 생성
const API = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // ✅ 쿠키 및 인증정보 포함
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 5초 타임아웃 설정
});

// 요청 인터셉터 (Request Interceptor)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (Response Interceptor)
API.interceptors.response.use(
  (response) => {
    // 200대의 응답 데이터를 이용해 실행
    return response},
  async (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized - Redirect to login");
      // 토큰 갱신 로직을 추가할 수 있음
    }
    return Promise.reject(error);
  }
);

export default API;
