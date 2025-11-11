import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "../../../shared-layer/api-segment/client";
import {authStorage} from "../../../shared-layer/libs-segment/authStorage";
import {unwrap} from "./useMeQuery";

export const useLoginMutation = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({login, password}:{login: string, password: string}) => {
            authStorage.saveBasicCredentials(login, password)
            return unwrap(client.GET('/auth/me'))
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