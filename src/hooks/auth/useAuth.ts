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

                if (res.ok) {
                    setIsLogin(true);
                } else {
                    setIsLogin(false);
                }
            } catch (error) {
                setIsLogin(false);
            }
        };

        checkLoginStatus();
    }, []);

    return isLogin;
}
