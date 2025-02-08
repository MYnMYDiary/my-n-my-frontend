// 📌 app/api/auth/check-login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    const refreshToken = cookies().get("refreshToken");
    
    console.log("refreshToken: ", refreshToken);

    if (!refreshToken) {
        return NextResponse.json({ isLogin: false }, { status: 401 });
    }

    return NextResponse.json({ isLogin: true }, { status: 200});
}