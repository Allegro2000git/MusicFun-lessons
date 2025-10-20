import type {QueryClient} from "./query-client";
import {type PropsWithChildren} from "react";
import {QueryClientContext as QueryClientContext} from "./QueryClientContext";

type Props = {
    client: QueryClient
}

export const QueryClientProvider = ({client, children}: PropsWithChildren<Props>) => {
    return (
        <QueryClientContext value={client}>
            {children}
        </QueryClientContext>
    )
}