import API from "@/api/interceptor/API";

/**
 * 마이페이지 - 다이어리 상세보기
 * @param diaryId 
 * @returns 
 */
export const getMyDiaryById = async (diaryId: number) => {
    try {
        const { data } = await API.get(`/diary/mydiary/${diaryId}`);
        return data;
    } catch (error) {
        console.error('다이어리 조회 실패:', error);
        throw error;
    }
};