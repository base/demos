"use client";

import { ThirdwebProvider } from "thirdweb/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
}
