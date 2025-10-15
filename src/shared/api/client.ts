import createClient, {type Middleware} from "openapi-fetch"
import type {paths} from "./schema";


export const client = createClient<paths>({ baseUrl: "https://musicfun.it-incubator.app/api/1.0/" });

const myMiddleware: Middleware = {
    async onRequest({ request }) {
        request.headers.set( 'API-KEY', "4b2edf61-719b-48e0-91e2-8896a84fc8cd");
        return request;
    },
};

client.use(myMiddleware)