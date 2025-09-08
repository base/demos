import sdk from "@farcaster/frame-sdk";
import { useMutation } from "@tanstack/react-query";
function useSwapToken() {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationFn: async (params) => {
      return await sdk.actions.swapToken(params);
    }
  });
  return {
    ...rest,
    swapToken: mutate,
    swapTokenAsync: mutateAsync
  };
}
export {
  useSwapToken
};
//# sourceMappingURL=useSwapToken.js.map
