"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../redux/hooks";
import { useRouter } from "next/router";
import { setIsLogin } from "@/features/user/userSlice";
import { logoutApi } from "@/features/user/userApi";

export function useLogout() {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();


    const logout = () => {
        queryClient.removeQueries(); // React Query 캐시 삭제
        logoutApi();
        dispatch(setIsLogin(false)); // Redux 상태 업데이트
    };

    return { logout };
}