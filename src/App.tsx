import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {TracksList} from "./TracksList";
import {TrackDetail} from "./TrackDetail";
import {BrowserRouter, Route, Routes, useParams} from "react-router";
import {AuthLayout, GlobalLayout} from "./layouts/AuthLayout";
import {CommonLayout} from "./layouts/CommonLayout";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10 * 1000,
            gcTime: 20 * 1000
        }
    }
})
// @ts-expect-error we dont need typing
window.__TANSTACK_QUERY_CLIENT__ = queryClient;


export function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/:lang?"} element={<GlobalLayout/>}>
                        <Route path={'auth'} element={<AuthLayout/>}>
                            <Route path={"login"} element={<Login/>}/>
                            <Route path={"register"} element={<Register/>}/>
                            <Route path={"*"} element={<AuthNotFound/>}/>
                        </Route>

                        <Route element={<CommonLayout/>}>
                            <Route path={"/"} element={<TracksList />} />
                            <Route path="/tracks/:trackId" element={<TrackDetail />} />
                        </Route>
                        <Route path={"*"} element={<NotFound/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

const Login = () => {
    let {lang} = useParams()
    if (!lang) lang = "en"

    return (
        <div>
            lang: {lang}
            <hr/>
            <input/>
            <input/>
            <button>Login</button>
        </div>
    )
}

const Register = () => {
    return (
        <div>
            <input/>
            <button>Register</button>
        </div>
    )
}

const AuthNotFound = () => {
   const params = useParams()
    return <h2>Auth Not Found {params['*']}</h2>
}

const NotFound = () => {
    return <h2>Not Found</h2>
}