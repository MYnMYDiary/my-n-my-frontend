import API from "@/api/interceptor/API";

/**
 * 마이페이지 - 다이어리 상세보기
 * @param diaryId 
 * @returns 
 */
export const getMyDiaryById = async (diaryId: number, categoryId: string, year: string, month: string) => {
    try {
        const { data } = await API.post(`/diary/mydiary/${diaryId}`,{categoryId, year, month});
        return data;
    } catch (error) {
        console.error('다이어리 조회 실패:', error);
        throw error;
    }
};