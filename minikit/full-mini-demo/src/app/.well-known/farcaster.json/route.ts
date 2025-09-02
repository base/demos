import { METADATA } from "../../../lib/utils";

export async function GET() {
  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjYxNiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDVFNzlGNjkwY2NENDIwMDdENUEwYUQ2NzhDRDQ3NDc0MzM5NDAwRTMifQ",
      payload: "eyJkb21haW4iOiJmcmFtZXMtdjItZGVtby1saWxhYy52ZXJjZWwuYXBwIn0",
      signature:
        "MHgwYjI0MTFlYzNmNTc0MzdiNThmOWExZWQ4YTYwZDY0ZGE2NDU0YWNmZjM2Nzc2MWUyYTI3NTk4YjliZmJjZmIxNWY1ODU1MmU0ZTdmOWY4OTA5ZjNjYjdjZWJjY2Y3MjQ5NmIwODlmYTNhMjQ0ZDE1Mzg1MzZmMzcwY2Y0NGE0YzFi",
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
        "allowedAddresses": ["0x8342A48694A74044116F330db5050a267b28dD85"],
      }
  };

  return Response.json(config);
}
