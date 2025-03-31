import API from "@/api/interceptor/API";

export const getSpace = async () => {
    const { data } = await API.get("/space");
    return data;
};