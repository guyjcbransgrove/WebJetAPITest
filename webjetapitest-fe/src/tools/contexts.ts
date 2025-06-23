import { createContext } from "react";
import type { ProviderState } from "./models";

export const ProviderStateContext = createContext<{cinemaworldStatus: ProviderState, filmworldStatus: ProviderState}>({cinemaworldStatus: "loading", filmworldStatus: "loading"});