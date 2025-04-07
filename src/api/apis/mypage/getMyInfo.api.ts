import API from "@/api/interceptor/API";

/**
 * 마이페이지 - 내 정보 조회
 * @returns 
 */
export const getMyInfo = async () => {
    try {
        const {data} = await API.get('/users/me');
        return data;
    } catch (error) {
        console.error('유저 정보 조회 실패:', error);
        throw error;
    }
}