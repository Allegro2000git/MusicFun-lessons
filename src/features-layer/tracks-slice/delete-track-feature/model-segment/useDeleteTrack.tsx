import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "../../../../shared-layer/api-segment/client";

export const useDeleteTrackMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (trackId: string) => {
            const wrapper = await client.DELETE('/playlists/tracks/{trackId}', {
                params: {
                    path: {
                        trackId
                    }
                }
            })

            if (wrapper.error) throw wrapper.error
            return wrapper.data
        },
        onSuccess: () => {
           return queryClient.invalidateQueries({
                queryKey: ['tracks']
            })
        }
    })
}