// object url이란?
// 브라우저에서 이미지 파일을 메모리에 저장하고 참조하는 방법입니다.
// 미리보기 이미지를 위해 사용

import { useEffect, useState } from "react";


/**
 * 파일을 URL로 변환하는 커스텀 훅
 * 
 */
export const useObjectUrl = () => {

    const [urls, setUrls] = useState<string[]>([]);

    //단일 이미지 파일을 위한 URL 생성
    const createUrl = (file: File | Blob): string => {
        const url = URL.createObjectURL(file);
        return url;
    }

    //여러 이미지 파일을 위한 URL 생성
    const createUrls = (files: File[]): string[] => {
        const newUrls = files.map(file => URL.createObjectURL(file));
        setUrls([...urls, ...newUrls]);
        return newUrls;
    }

    // 모든 URL 정리
    const revokeAll = () => {
        urls.forEach(url => URL.revokeObjectURL(url));
        setUrls([]);
    }

    // 컴포넌트 언마운트 시 정리
    useEffect(() => {
        return () => {
            revokeAll();
        }
    }, []);
    
    return {
        createUrl,
        createUrls,
        revokeAll
    }
}