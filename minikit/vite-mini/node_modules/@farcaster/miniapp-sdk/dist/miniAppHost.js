import { wrap } from 'comlink';
import { endpoint } from "./endpoint.js";
export const miniAppHost = wrap(endpoint);
// Backward compatibility
export const frameHost = miniAppHost;
