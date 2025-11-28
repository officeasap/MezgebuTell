import { Wallet } from "lucide-react";

interface BalanceCardProps {
  balance: string;
}

export function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className="frame-glossy p-4 mx-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-primary icon-shadow" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Available Balance
            </p>
            <p className="text-2xl font-bold text-foreground">{balance}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
