import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "../../../shared-layer/api-segment/client";
import {authStorage} from "../../../shared-layer/libs-segment/authStorage";

export const useLoginMutation = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({login, password}:{login: string, password: string}) => {
            authStorage.saveBasicCredentials(login, password)
            const  wrapper = await client.GET('/auth/me')
            if (wrapper.error) {
                authStorage.removeBasicCredentials()
                throw wrapper.error
            }
            return wrapper.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['auth']
            })
        },
        onError: () => {
            authStorage.removeBasicCredentials()
        }
    })
}