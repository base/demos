import sdk from "@farcaster/frame-sdk";
import { useQuery } from "@tanstack/react-query";
function useIsInMiniApp() {
  const { data, ...rest } = useQuery({
    queryKey: ["useIsInMiniApp"],
    queryFn: async () => !!await sdk.context
  });
  return {
    ...rest,
    isInMiniApp: data
  };
}
export {
  useIsInMiniApp
};
//# sourceMappingURL=useIsInMiniApp.js.map
