import { CreditCard, Bitcoin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BuyCredits() {
  const handleVisaPayment = () => {
    // In production: opens proxy route to Fanytel payment
    window.open("#", "_blank");
  };

  const handleCryptoPayment = () => {
    // In production: opens CRYPTO_WALLET_URL from env
    window.open("#", "_blank");
  };

  return (
    <div className="px-4 py-4">
      <h2 className="text-lg font-semibold text-foreground mb-6">Buy Credits</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* VISA Payment */}
        <Button
          variant="payment"
          onClick={handleVisaPayment}
          className="h-40"
        >
          <div className="w-16 h-16 rounded-xl bg-background/50 flex items-center justify-center mb-2 shadow-signature-sm">
            <CreditCard className="w-8 h-8 text-foreground icon-shadow" />
          </div>
          <span className="font-bold text-lg">VISA</span>
          <span className="text-xs text-muted-foreground">Credit/Debit Card</span>
          <ExternalLink className="w-4 h-4 text-muted-foreground mt-2" />
        </Button>

        {/* Crypto Payment */}
        <Button
          variant="payment"
          onClick={handleCryptoPayment}
          className="h-40"
        >
          <div className="w-16 h-16 rounded-xl bg-background/50 flex items-center justify-center mb-2 shadow-signature-sm logo-placeholder">
            <Bitcoin className="w-8 h-8 text-primary icon-shadow" />
          </div>
          <span className="font-bold text-lg">CRYPTO</span>
          <span className="text-xs text-muted-foreground">Bitcoin & More</span>
          <ExternalLink className="w-4 h-4 text-muted-foreground mt-2" />
        </Button>
      </div>

      {/* Crypto QR Code Placeholder */}
      <div className="mt-6">
        <p className="text-sm text-muted-foreground mb-3">Scan to pay with crypto</p>
        <div className="frame-glossy p-6 flex items-center justify-center">
          <div className="logo-placeholder w-48 h-48 flex items-center justify-center">
            <div className="text-center">
              <Bitcoin className="w-12 h-12 text-muted-foreground mx-auto mb-2 icon-shadow" />
              <p className="text-xs text-muted-foreground">QR Code Placeholder</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 frame-glossy p-4">
        <p className="text-sm text-muted-foreground">
          Credits are added instantly after payment confirmation. 
          Crypto payments may take 10-30 minutes to confirm.
        </p>
      </div>
    </div>
  );
}
