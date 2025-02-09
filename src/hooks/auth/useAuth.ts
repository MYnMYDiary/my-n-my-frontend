'use client'

import { useState, useEffect } from "react";

export function useAuth() {
    const [isLogin, setIsLogin] = useState<boolean>(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await fetch(
                    "/api/auth/check-login", 
                    { 
                        method: "GET",
                        credentials: "include" 
                    }
                );

                if (!res.ok) {
                    setIsLogin(false);
                    return;
                }

                const data = await res.json(); // { isLogin: true } 또는 { isLogin: false }
                setIsLogin(data.isLogin);
                
            } catch (error) {
                console.error("로그인 상태 확인 중 오류 발생:", error);
                setIsLogin(false);
            }
        };

        checkLoginStatus();
    }, []);

    return isLogin;
}
