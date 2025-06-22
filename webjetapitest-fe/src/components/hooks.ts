import { useState } from "react";
import type { ProviderId, ProviderRequest, ProviderState } from "./models";

export function useProviderRequest<T>(providerId: ProviderId, request: Promise<T>): ProviderRequest<T> {
	const [providerState, setProviderState] = useState<ProviderState>("loading");
	return {
		providerId,
		request,
		providerState,
		setProviderState
	}
}