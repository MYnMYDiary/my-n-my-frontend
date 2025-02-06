import { blobUrlToFile } from "./blobToFile";

interface Param {
    blobUrl: string;
    fileName: string;
    fieldName: 'image' | 'file'
}

/**
 * Blob URL을 File로 변환한 후, FormData를 생성
 * @param blobUrl `blob:http://localhost:3000/~` 과 같은 형태의 값
 * @param fileName 파일명
 * @param fieldName  데이터를 받을 때 사용하는 키 값. fieldName이 `image`라면 백엔드에서 req.file('image')로 받음
 * @returns 
 */
export const createFormData = async ({blobUrl, fileName, fieldName}:Param) => {
    try {
        const file = await blobUrlToFile(blobUrl, fileName);
        if (!file) throw new Error("File conversion failed");

        const formData = new FormData();
        formData.append(fieldName, file);
        return formData;
    } catch (error) {
        console.error("Error creating FormData:", error);
        return null;
    }
};
