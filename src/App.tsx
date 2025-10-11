import './App.css'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {TracksList} from "./TracksList";
import {TrackDetail} from "./TrackDetail";
import {BrowserRouter, NavLink, Route} from "./shared/libs/router/Route";

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
                <header>
                    <NavLink to={"/"}>Main</NavLink>
                </header>
                <Route path={"/"} element={<TracksList />} />
                <Route path="/tracks/:trackId" element={<TrackDetail />} />
            </BrowserRouter>
        </QueryClientProvider>
    )
}