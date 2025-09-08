////////////////////////////////////////////////////////////////////////////////
// Actions
////////////////////////////////////////////////////////////////////////////////
// biome-ignore lint/performance/noBarrelFile: entrypoint module
export { 
/** @deprecated This is no longer experimental – use `import { getCallsStatus } from '@wagmi/core'` instead. */
getCallsStatus, } from '../actions/getCallsStatus.js';
export { 
/** @deprecated This is no longer experimental – use `import { getCapabilities } from '@wagmi/core'` instead. */
getCapabilities, } from '../actions/getCapabilities.js';
export { 
/** @deprecated This is no longer experimental – use `import { sendCalls } from '@wagmi/core'` instead. */
sendCalls, } from '../actions/sendCalls.js';
export { 
/** @deprecated This is no longer experimental – use `import { showCallsStatus } from '@wagmi/core'` instead. */
showCallsStatus, } from '../actions/showCallsStatus.js';
export { 
/** @deprecated This is no longer experimental – use `import { waitForCallsStatus } from '@wagmi/core'` instead. */
waitForCallsStatus, } from '../actions/waitForCallsStatus.js';
export { 
/** @deprecated Use `sendCalls` instead. */
writeContracts, } from '../experimental/actions/writeContracts.js';
////////////////////////////////////////////////////////////////////////////////
// Tanstack Query
////////////////////////////////////////////////////////////////////////////////
export { 
/** @deprecated Use `sendCallsMutationOptions` instead. */
writeContractsMutationOptions, } from '../experimental/query/writeContracts.js';
export { 
/** @deprecated This is no longer experimental – use `import { getCallsStatusQueryKey } from '@wagmi/core/query'` instead. */
getCallsStatusQueryKey, 
/** @deprecated This is no longer experimental – use `import { getCallsStatusQueryOptions } from '@wagmi/core/query'` instead. */
getCallsStatusQueryOptions, } from '../query/getCallsStatus.js';
export { 
/** @deprecated This is no longer experimental – use `import { getCapabilitiesQueryKey } from '@wagmi/core/query'` instead. */
getCapabilitiesQueryKey, 
/** @deprecated This is no longer experimental – use `import { getCapabilitiesQueryOptions } from '@wagmi/core/query'` instead. */
getCapabilitiesQueryOptions, } from '../query/getCapabilities.js';
export { 
/** @deprecated This is no longer experimental – use `import { sendCallsMutationOptions } from '@wagmi/core/query'` instead. */
sendCallsMutationOptions, } from '../query/sendCalls.js';
export { 
/** @deprecated This is no longer experimental – use `import { showCallsStatusMutationOptions } from '@wagmi/core/query'` instead. */
showCallsStatusMutationOptions, } from '../query/showCallsStatus.js';
export { 
/** @deprecated This is no longer experimental – use `import { waitForCallsStatusQueryKey } from '@wagmi/core/query'` instead. */
waitForCallsStatusQueryKey, 
/** @deprecated This is no longer experimental – use `import { waitForCallsStatusQueryOptions } from '@wagmi/core/query'` instead. */
waitForCallsStatusQueryOptions, } from '../query/waitForCallsStatus.js';
//# sourceMappingURL=experimental.js.map