import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { CreateCoinArgs } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CoinDetailsProps {
  coinParams: CreateCoinArgs;
}

export function CoinDetails({ coinParams }: CoinDetailsProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-accentPrimary/5 via-background/80 to-background/90 p-1 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="bg-background/95 backdrop-blur-sm rounded-xl p-4 sm:p-6">
        <CardHeader className="bg-accentPrimary/10 border-b border-accentPrimary/10 p-3 sm:p-4 rounded-t-lg">
          <CardTitle className="text-xl sm:text-2xl font-bold text-accentPrimary tracking-tight">
            Coin Details
          </CardTitle>
          <CardDescription className="text-accentPrimary/70 text-sm sm:text-base mt-1">
            Review your coin specifications before creation
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
            {[
              { label: "Name", value: coinParams.name },
              { label: "Symbol", value: coinParams.symbol },
              { label: "URI", value: coinParams.uri },
              { label: "Payout Recipient", value: coinParams.payoutRecipient },
            ].map((item) => (
              <div
                key={item.label}
                className={cn(
                  "group rounded-xl p-3 sm:p-4 bg-accentPrimary/5 hover:bg-accentPrimary/10 transition-all duration-200 cursor-pointer",
                  item.label === "URI" && "sm:col-span-2",
                  "active:bg-accentPrimary/15" // For touch feedback
                )}
              >
                <h3 className="text-xs sm:text-sm font-semibold text-accentPrimary uppercase tracking-wider mb-2">
                  {item.label}
                </h3>
                <p
                  className={cn(
                    "text-accentPrimary/90 text-sm sm:text-base",
                    item.label === "Payout Recipient" && "font-mono text-xs sm:text-sm",
                    item.label === "URI" && "break-all text-xs sm:text-sm"
                  )}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}