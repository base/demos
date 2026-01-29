import { farcasterConfig } from "../../../farcaster.config";

export async function GET() {
  return Response.json(farcasterConfig);
}
