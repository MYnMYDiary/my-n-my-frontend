'use client'

/**
 * HEIC 파일을 JPG 파일로 변환 - 시간이 오래 걸림
 * @param file 
 * @returns 
 */
export const convertHeicToJpg = async (file: File): Promise<File> => {
    // 클라이언트 사이드에서만 heic2any를 동적으로 임포트
    const heic2any = (await import('heic2any')).default;
    
    try {
        const blob = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.9
        });
        
        return new File([blob as Blob], 
            file.name.replace(/\.heic$/i, '.jpg'), 
            { type: 'image/jpeg' }
        );
    } catch (error) {
        throw new Error('HEIC 파일 변환 실패');
    }
};