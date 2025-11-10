import createClient, {type Middleware} from "openapi-fetch"
import type {paths} from "./schema";
import {authStorage} from "../libs-segment/authStorage";

export const client = createClient<paths>({ baseUrl: "https://musicfun.it-incubator.app/api/1.0/" });

const myMiddleware: Middleware = {
    async onRequest({ request }) {
        request.headers.set( 'API-KEY', "a727ff81-a");
        const {login, password} = authStorage.getBasicCredentials()
        const encoded = btoa(`${login}:${password}`)
        request.headers.set('Authorization', `Basic ${encoded}`)
        return request;
    },
};

client.use(myMiddleware)