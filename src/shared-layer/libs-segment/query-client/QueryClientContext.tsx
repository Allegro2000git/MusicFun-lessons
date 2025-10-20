import {createContext} from "react";
import type {QueryClient} from "./query-client";

export const QueryClientContext = createContext<QueryClient | null>(null)