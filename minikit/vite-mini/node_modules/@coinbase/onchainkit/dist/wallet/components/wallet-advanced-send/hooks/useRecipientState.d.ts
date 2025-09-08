import { RecipientState } from '../types';
export declare function useRecipientState(): {
    recipientState: RecipientState;
    updateRecipientInput: (input: string) => void;
    validateRecipientInput: (input: string) => void;
    selectRecipient: (selection: Extract<RecipientState, {
        phase: "selected";
    }>) => Promise<void>;
    deselectRecipient: () => void;
};
//# sourceMappingURL=useRecipientState.d.ts.map