/**
 * Blob URL을 File로 변환
 * @param blobUrl 
 * @param fileName 
 * @returns File 객체
 */
export const blobUrlToFile = async (blobUrl:string, fileName:string) => {
    try {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
    } catch (error) {
        console.error("Error converting blob URL to file:", error);
        return null;
    }
};