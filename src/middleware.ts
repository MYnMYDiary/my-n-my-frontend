import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const url = req.nextUrl;

  const protectedRoutes = ["/dashboard", "/profile", "/settings"];

  // 보호된 페이지인지 확인
  if (!protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  try {
    // 백엔드 API를 호출하여 AccessToken 가져오기
    const tokenResponse = await fetch('http://localhost:8080/auth/token/access',{
        method: "POST",
        credentials: "include", // RefreshToken 포함
        headers: {
            "Content-Type": "application/json",
        },
    });

    const token = await tokenResponse.json();

    if(token.statusCode = 401){
      console.log(token.message); // 토큰 상태 메시지 출력
      
      console.log(res.cookies.get('refreshToken')?.value);
      // 로그인 만료 -> 로그인 페이지로 리디렉션
      return NextResponse.redirect(new URL("auth/login", req.url));
    }

    if (token) {
      const newAccessToken = '';

      // NextAuth 세션 업데이트
      await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: newAccessToken }),
      });

      return NextResponse.next();
    }
  } catch (error) {
    console.error("AccessToken 갱신 실패", error);
  }

}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
