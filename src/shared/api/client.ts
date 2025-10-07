import createClient, {type Middleware} from "openapi-fetch"
import type {paths} from "./schema";


export const client = createClient<paths>({ baseUrl: "https://musicfun.it-incubator.app/api/1.0/" });

const myMiddleware: Middleware = {
    async onRequest({ request }) {
        request.headers.set( 'API-KEY', "8b90cddd-f776-4a2a-9095-25f652e76b49");
        return request;
    },
};

client.use(myMiddleware)