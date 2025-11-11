import createClient, {type Middleware} from "openapi-fetch"
import type {paths} from "./schema";
import {authStorage} from "../libs-segment/authStorage";

export const client = createClient<paths>({ baseUrl: "https://musicfun.it-incubator.app/api/1.0/" });

const myMiddleware: Middleware = {
    async onRequest({ request }) {
        request.headers.set( 'API-KEY', "");
        const {login, password} = authStorage.getBasicCredentials()
        const encoded = btoa(`${login}:${password}`)
        request.headers.set('Authorization', `Basic ${encoded}`)
        return request;
    },
   async onResponse({response}) {
        if (!response.ok) {
            const responseBody = await response.json()
            const error = new APIError(response, responseBody)
            throw error
        }
    }
};

client.use(myMiddleware)

class APIError extends Error {
 constructor(public response: Response, public body: any) {
     super(`${response.url} ${response.status} ${response.statusText}`)
    }
}