import { blobUrlToFile } from "./blob-to-file";


interface Param {
    blobUrl: string | string[];
    fileName: string | string[];
    fieldName: 'image' | 'file'
}

/**
 * Blob URL을 File로 변환한 후, FormData를 생성
 * @param blobUrl `blob:http://localhost:3000/~` 과 같은 형태의 값 또는 값들의 배열
 * @param fileName 파일명 또는 파일명 배열
 * @param fieldName 데이터를 받을 때 사용하는 키 값. fieldName이 `image`라면 백엔드에서 req.file('image')로 받음
 * @returns 
 */
export const createFormData = async ({blobUrl, fileName, fieldName}: Param) => {
    try {
        const formData = new FormData();

        if (Array.isArray(blobUrl) && Array.isArray(fileName)) {
            // blobUrl과 fileName이 모두 배열인 경우
            await Promise.all(
                blobUrl.map(async (url, index) => {
                    const file = await blobUrlToFile(url, fileName[index]);
                    if (!file) throw new Error("File conversion failed");
                    formData.append(fieldName, file);
                })
            );
        } else if (!Array.isArray(blobUrl) && !Array.isArray(fileName)) {
            // 단일 파일인 경우
            const file = await blobUrlToFile(blobUrl, fileName);
            if (!file) throw new Error("File conversion failed");
            formData.append(fieldName, file);
        } else {
            throw new Error("blobUrl과 fileName의 타입이 일치하지 않습니다.");
        }

        return formData;
    } catch (error) {
        console.error("FormData 생성 실패:", error);
        return null;
    }
};
