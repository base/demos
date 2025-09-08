import sdk from "@farcaster/frame-sdk";
import { useMutation } from "@tanstack/react-query";
function useSendToken() {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationFn: async (params) => {
      return await sdk.actions.sendToken(params);
    }
  });
  return {
    ...rest,
    sendToken: mutate,
    sendTokenAsync: mutateAsync
  };
}
export {
  useSendToken
};
//# sourceMappingURL=useSendToken.js.map
