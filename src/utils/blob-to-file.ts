/**
 * Blob URL을 File로 변환
 * @param blobUrl 
 * @param fileName 
 * @returns File 객체
 * @throws Error blob 변환 실패시
 */
export const blobUrlToFile = async (blobUrl: string, fileName: string): Promise<File> => {
    try {
        // Blob URL에서 직접 Blob 객체 가져오기
        const blob = await (await fetch(blobUrl)).blob();
        return new File([blob], fileName, { type: "image/jpeg" });
    } catch (error) {
        console.error("Blob URL을 File로 변환 실패:", error);
        throw new Error("Blob URL을 File로 변환 실패");
    }
};