import sdk from "@farcaster/frame-sdk";
import { useMutation } from "@tanstack/react-query";
function useViewCast() {
  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationFn: async (params) => {
      return await sdk.actions.viewCast(params);
    }
  });
  return {
    ...rest,
    viewCast: mutate,
    viewCastAsync: mutateAsync
  };
}
export {
  useViewCast
};
//# sourceMappingURL=useViewCast.js.map
