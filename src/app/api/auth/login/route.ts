import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json(); // 클라이언트에서 보낸 로그인 데이터 {user: {email, password}}

    const res = await fetch("http://localhost:8080/auth/login/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include", // ✅ 백엔드에서 HttpOnly 쿠키(`refreshToken`)를 받아오기
    });

    if (!res.ok) {
        return NextResponse.json({ error: "Login failed" }, { status: res.status });
    }

    const setCookieHeaders = res.headers.getSetCookie(); // ✅ 여러 개의 Set-Cookie 헤더를 배열로 가져옴 
    const cookieStore = await cookies();

    // ✅ Next.js API에서 직접 쿠키 저장
    // cookies().get('refreshToken')?.value => 로 쿠키 값 가져올 수 있음
    if (setCookieHeaders) {
        setCookieHeaders.forEach((cookieStr) => {
            const [cookieName, cookieValue] = cookieStr.split(";")[0].split("="); // 쿠키 이름과 값 추출
            if (cookieName === "refreshToken") {
                cookieStore.set({
                    name: cookieName,
                    value: cookieValue,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: true,
                    path: "/",
                    maxAge: 60 * 60 * 3, // 3시간 유지 - 백엔드의 refreshToken 유지 시간과 맞추기
                    //maxAge: 60 * 60 * 24 * 7, // 7일 유지
                });
            }
        });
    }

    const data = await res.json();

    return NextResponse.json({ accessToken: data.accessToken });

}
