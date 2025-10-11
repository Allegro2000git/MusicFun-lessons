import createClient, {type Middleware} from "openapi-fetch"
import type {paths} from "./schema";


export const client = createClient<paths>({ baseUrl: "https://musicfun.it-incubator.app/api/1.0/" });

const myMiddleware: Middleware = {
    async onRequest({ request }) {
        request.headers.set( 'API-KEY', "ef4f3c53-8ec8-4333-8254-976c516fd76f");
        return request;
    },
};

client.use(myMiddleware)