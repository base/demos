import { METADATA } from "../../../lib/utils";

export async function GET() {
  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjIwMzkwLCJ0eXBlIjoiYXV0aCIsImtleSI6IjB4RjA3NDFhMGI5ZjhBN2M2ZUUzNzQwYkQyMjNBODQ1N0UxNzM5MjIyMyJ9",
      payload: "eyJkb21haW4iOiJmdWxsLW1pbmktZGVtby52ZXJjZWwuYXBwIn0",
      signature:
        "jqp+dMIhipQzfGVWxVp762y4TQJA8x4uyny0DOF+GZFRuUBE+/Moz+GXE66FbTRqt+QBiZ6feGBqWQHP1mEY8Bw=",
    },
      "frame": {
        "version": "1",
        "name": METADATA.name,
        "iconUrl": METADATA.iconImageUrl,
        "homeUrl": METADATA.homeUrl,
        "imageUrl": METADATA.bannerImageUrl,
        "splashImageUrl": METADATA.iconImageUrl,
        "splashBackgroundColor": METADATA.splashBackgroundColor,
        "description": METADATA.description,
        "ogTitle": METADATA.name,
        "ogDescription": METADATA.description,
        "ogImageUrl": METADATA.bannerImageUrl,
        "requiredCapabilities": [
          "actions.ready",
          "actions.signIn", 
          "actions.openMiniApp",
          "actions.openUrl",
          "actions.sendToken",
          "actions.viewToken", 
          "actions.composeCast",
          "actions.viewProfile",
          "actions.setPrimaryButton",
          "actions.swapToken",
          "actions.close",
          "actions.viewCast",
          "wallet.getEthereumProvider"
        ],
        "requiredChains": [
          "eip155:8453",
          "eip155:10"
        ],
        "canonicalDomain": "frames-v2-demo-lilac.vercel.app",
        "noindex": false,
        "tags": ["base", "baseapp", "miniapp", "demo", "basepay"]
      },
      "baseBuilder": {
        "allowedAddresses": ["0x4522FAc5C7aa59cFa7923961C5cF7Ea3bb493978"],
      }
  };

  return Response.json(config);
}
