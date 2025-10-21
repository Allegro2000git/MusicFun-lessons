import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {TrackDetail} from "./TrackDetail";
import {BrowserRouter, Route, Routes} from "react-router";
import {AuthLayout} from "./layouts/AuthLayout";
import {CommonLayout} from "./layouts/CommonLayout";
import {TracksList} from "./widgets-layer/tracks-slice/ui-segment/TracksList";
import {GlobalLayout} from "./layouts/GlobalLayout";
import {Login} from "./pages-layer/Login";
import {Register} from "./pages-layer/Register";
import {NotFound} from "./pages-layer/NotFound";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            gcTime: 60 * 1000
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
                    <Route element={<GlobalLayout/>}>
                        <Route path={'auth'} element={<AuthLayout/>}>
                            <Route path={"login"} element={<Login/>}/>
                            <Route path={"register"} element={<Register/>}/>
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

