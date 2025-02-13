import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const url = req.nextUrl;

  const protectedRoutes = ['/createDiary', '/myPage'];

  // 보호된 페이지인지 확인
  if (!protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const refreshToken = cookies().get("refreshToken")?.value;

  if(!refreshToken){
    return NextResponse.redirect(new URL("auth/login", req.url)); // 로그인 페이지로
  }

  const tokenResponse = await fetch('http://localhost:8080/auth/token/access',{
      method: "POST",
      credentials: "include", // RefreshToken 포함
      headers: {
          "Content-Type": "application/json",
          "Cookie": `refreshToken=${refreshToken}`
      },
      body: null
  });

  const token = await tokenResponse.json();

  console.log(tokenResponse.ok);

  if(tokenResponse.ok){
    try {
      if (token.accessToken) {
        return NextResponse.next();
      }

      if(token.statusCode = 401){
        console.log(token.message); // 토큰 상태 메시지 출력
        // 로그인 만료 -> 로그인 페이지로 리디렉션
        return NextResponse.redirect(new URL("auth/login", req.url));
      }  
    } catch (error) {
      
    }
  }






}

export const config = {
  matcher: ['/createDiary', '/myPage'],
};
