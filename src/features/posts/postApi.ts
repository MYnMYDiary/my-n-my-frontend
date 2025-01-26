// 예시 - 삭제해도 됨
// React Query를 사용하여 api 요청 관리



import API from "@/api/interceptor/API";
import { useQuery } from "@tanstack/react-query";



const fetchPosts = async () => {
  const { data } = await API.get("/diary");
  return data;
};

export const useFetchPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
