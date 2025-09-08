import sdk from "@farcaster/frame-sdk";
import { useMutation } from "@tanstack/react-query";
function useComposeCast() {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationFn: async (params) => {
      return await sdk.actions.composeCast(params);
    }
  });
  return {
    ...rest,
    composeCast: mutate,
    composeCastAsync: mutateAsync
  };
}
export {
  useComposeCast
};
//# sourceMappingURL=useComposeCast.js.map
