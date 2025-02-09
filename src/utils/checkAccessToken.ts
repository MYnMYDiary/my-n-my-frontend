"use client";

import { InternalAxiosRequestConfig } from "axios";

/**
 * 액세스 토큰 검증 함수
 * @param accessToken 액세스 토큰
 * @returns 검증된 accessToken (유효하지 않으면 null)
 */
export const checkAccessToken = ( accessToken: string | null) => {
    
  // accessToken 검증 (string인지 확인)
  if (typeof accessToken !== "string" || !accessToken.trim()) {
    console.warn("유효하지 않은 accessToken:", accessToken);
    return null; // 유효하지 않으면 null 반환
  }

  // JWT 형식인지 확인하는 정규식 (대략적인 체크)
  const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
  if (!jwtPattern.test(accessToken)) {
    console.warn("올바르지 않은 JWT 형식의 accessToken:", accessToken);
    return null;
  }

  return accessToken; // 유효하면 반환
};
