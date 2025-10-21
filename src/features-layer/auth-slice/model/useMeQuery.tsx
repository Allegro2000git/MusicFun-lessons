import {useQuery} from "@tanstack/react-query";
import {client} from "../../../shared-layer/api-segment/client";

export const useMeQuery = () => {

    return useQuery({
        queryFn: async () => {
            const  wrapper = await client.GET('/auth/me')
            if (wrapper.error) {
                throw wrapper.error
            }
            return wrapper.data
        },
        queryKey: [],
        retry: false
    })
};