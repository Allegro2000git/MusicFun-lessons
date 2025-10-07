import './App.css'
import {MainPage} from "./MainPage";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

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
            <MainPage/>
        </QueryClientProvider>
    )
}