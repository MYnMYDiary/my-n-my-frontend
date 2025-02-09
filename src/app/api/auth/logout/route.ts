import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    
    // 쿠키에 있는 리프레시 토큰 삭제
    cookies().delete('refreshToken');

    const refreshToken = cookies().get('refreshToken')?.value;

    if(!refreshToken){
        console.log('로그아웃 성공');
        return NextResponse.json({ isLogin: false }, { status: 200 });
    }
    else{
        console.log('로그아웃 실패');
        return NextResponse.json({ isLogin: true }, { status: 401 });
    }
}