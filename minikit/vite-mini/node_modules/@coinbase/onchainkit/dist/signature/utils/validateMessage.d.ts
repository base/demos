import { SignMessageParameters, SignTypedDataParameters } from 'wagmi/actions';
import { MessageData, ValidateMessageResult } from '../types';
export declare function isTypedData(params: MessageData): params is SignTypedDataParameters;
export declare function isSignableMessage(params: MessageData): params is SignMessageParameters;
export declare function validateMessage(messageData: MessageData): ValidateMessageResult;
//# sourceMappingURL=validateMessage.d.ts.map