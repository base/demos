export declare enum RichFragmentType {
    Text = "text",
    TokenValue = "tokenValue",
    Address = "address"
}
export type RichTokenValueFragment = {
    type: RichFragmentType.TokenValue;
    value: string;
    symbol: string | null;
    logoUri: string | null;
};
export type RichTextFragment = {
    type: RichFragmentType.Text;
    value: string;
};
export type RichAddressFragment = {
    type: RichFragmentType.Address;
    value: string;
};
export type RichDecodedInfoFragment = RichTokenValueFragment | RichTextFragment | RichAddressFragment;
export type RichDecodedInfo = {
    fragments: Array<RichDecodedInfoFragment>;
};
