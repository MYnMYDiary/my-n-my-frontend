import API from "@/api/interceptor/API"
import { useQuery } from "@tanstack/react-query";


const getAllDiarys = async () => {
    const {data} = await API.get('/diary');
    return data;
}


export const useGetAllDiarys = () => {
    return useQuery({
        queryKey: ["diarys"],
        queryFn: getAllDiarys,
        staleTime: 1000 * 60 * 5, // 5분 캐싱
    });
}