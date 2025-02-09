// 📌 app/api/auth/check-login/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    
    const refreshToken = cookies().get("refreshToken");

    if (!refreshToken) {
        return NextResponse.json({ isLogin: false }, { status: 200 });
    }

    return NextResponse.json({ isLogin: true }, { status: 200});
}