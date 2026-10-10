import React, { useState } from 'react';
import { 
  Check, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Store, 
  Wallet,
  QrCode
} from 'lucide-react';

export default function WalletCheckoutModal({
  isOpen,
  onClose,
  settings,
  onPaymentSuccess
}) {
  const [step, setStep] = useState('confirm'); // 'confirm' | 'processing' | 'success'
  const [selectedWallet, setSelectedWallet] = useState('yape'); // 'yape' | 'plin'
  const [merchant, setMerchant] = useState({
    name: 'Starbucks Coffee',
    detail: 'Av. Las Begonias 415, San Isidro',
    category: 'Café & Pastelería',
    amount: 24.50
  });

  if (!isOpen) return null;

  // Calculo de microahorro segun reglas
  let basePct = settings.percentage / 100;
  let original = merchant.amount;
  let saved = original * basePct;

  if (settings.roundUp) {
    const ceil = Math.ceil(original);
    const diff = Number((ceil - original).toFixed(2));
    saved += diff > 0 ? diff : 1.0;
  }

  if (settings.weekendBooster) {
    saved = saved * 2;
  }

  saved = Number(saved.toFixed(2));
  const totalDebited = (original + saved).toFixed(2);

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');

      // Notificar al estado global
      onPaymentSuccess({
        merchant: merchant.name,
        category: merchant.category,
        method: selectedWallet === 'yape' ? 'Yape' : 'Plin',
        originalAmount: original,
        savedAmount: saved,
        multiplierApplied: settings.weekendBooster
      });
    }, 1200);
  };

  const handleFinish = () => {
    setStep('confirm');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md">
      {/* Phone modal frame simulating the user's active wallet */}
      <div className="relative w-full max-w-[360px] rounded-[36px] overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* ======================= VISTA 1: CONFIRMAR PAGO ======================= */}
        {step === 'confirm' && (
          <div className="bg-[#000033] border border-white/20 text-white p-6 flex flex-col justify-between min-h-[520px]">
            {/* Header POV */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <button 
                  onClick={onClose}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5 text-xs font-bold tracking-wide">
                  <span>Mi Billetera Digital</span>
                </div>
                <div className="w-6" />
              </div>

              {/* Selector de método (Yape / Plin) */}
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedWallet('yape')}
                  className={`py-2.5 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 ${
                    selectedWallet === 'yape'
                      ? 'bg-[#742284] text-white shadow-lg border border-[#d896e8]/40'
                      : 'bg-white/5 text-white/60 border border-white/10'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white text-[#742284] flex items-center justify-center text-[10px] font-black">Y</span>
                  <span>Pagar con Yape</span>
                </button>

                <button
                  onClick={() => setSelectedWallet('plin')}
                  className={`py-2.5 px-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 ${
                    selectedWallet === 'plin'
                      ? 'bg-[#00a9e0] text-black shadow-lg border border-[#9ae5fc]/60'
                      : 'bg-white/5 text-white/60 border border-white/10'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black">P</span>
                  <span>Pagar con Plin</span>
                </button>
              </div>

              {/* Merchant Details */}
              <div className="mt-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-3">
                  <Store className="w-7 h-7 text-[#04c4b3]" />
                </div>
                <h3 className="text-lg font-display font-bold text-white">{merchant.name}</h3>
                <p className="text-xs text-white/60 mt-0.5">{merchant.detail}</p>

                {/* Amount to Pay */}
                <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-xs text-white/60 block">Monto del consumo</span>
                  <div className="text-3xl font-display font-extrabold text-white mt-1">
                    S/ {merchant.amount.toFixed(2)}
                  </div>
                </div>

                {/* POV: SBS Micro-saving Highlight */}
                <div className="mt-4 p-3.5 rounded-2xl bg-[#04c4b3]/15 border border-[#04c4b3]/40 flex items-center justify-between text-left">
                  <div>
                    <div className="text-xs font-bold text-[#04c4b3] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#ffb601]" />
                      <span>Regla Bóveda SBS</span>
                    </div>
                    <span className="text-[11px] text-white/80 block mt-0.5">
                      Apartas {settings.percentage}% {settings.roundUp ? '+ redondeo' : ''} a tu retiro
                    </span>
                  </div>
                  <span className="text-sm font-mono font-bold text-[#04c4b3]">
                    +S/ {saved.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <div className="pt-4">
              <button
                onClick={handlePay}
                className={`w-full py-4 rounded-2xl font-bold text-sm transition active:scale-95 shadow-xl flex items-center justify-center gap-2 ${
                  selectedWallet === 'yape'
                    ? 'bg-[#742284] text-white hover:opacity-95'
                    : 'bg-[#00a9e0] text-black hover:opacity-95'
                }`}
              >
                <span>Confirmar y Pagar S/ {merchant.amount.toFixed(2)}</span>
              </button>
            </div>
          </div>
        )}

        {/* ======================= VISTA 2: PROCESANDO PAGO ======================= */}
        {step === 'processing' && (
          <div className="bg-[#000033] border border-white/20 text-white p-8 flex flex-col items-center justify-center min-h-[520px] text-center">
            <div className="w-20 h-20 rounded-full border-4 border-[#04c4b3] border-t-transparent animate-spin mb-6" />
            <h3 className="text-lg font-display font-bold text-white">Procesando pago...</h3>
            <p className="text-xs text-white/60 mt-1">
              Conectando con {selectedWallet === 'yape' ? 'Yape BCP' : 'Plin'} y activando Bóveda SBS
            </p>
          </div>
        )}

        {/* ======================= VISTA 3: VOUCHER POV REALISTA ======================= */}
        {step === 'success' && (
          <div className="bg-gradient-to-b from-[#000844] via-[#000033] to-[#0131a0]/30 border border-white/20 text-white p-6 flex flex-col justify-between min-h-[520px]">
            <div>
              {/* Checkmark icon */}
              <div className="text-center pt-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#04c4b3] text-black flex items-center justify-center shadow-glow-teal animate-bounce">
                  <Check className="w-9 h-9 stroke-[3]" />
                </div>
                <h3 className="text-xl font-display font-extrabold text-white mt-4">
                  ¡Pago Efectuado!
                </h3>
                <span className="text-xs text-[#04c4b3] font-semibold">
                  Transacción exitosa en {selectedWallet === 'yape' ? 'Yape' : 'Plin'}
                </span>
              </div>

              {/* POV Notification Card (Lo que ve el usuario) */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-tr from-[#0131a0]/40 to-[#04c4b3]/20 border border-[#04c4b3]/50 text-left shadow-lg">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/70 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#ffb601]" />
                    Notificación Bóveda SBS
                  </span>
                  <span className="text-[10px] text-[#04c4b3] font-mono">Ahora</span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-white/70 block">Ahorraste automáticamente:</span>
                    <span className="text-2xl font-display font-extrabold text-[#04c4b3]">
                      +S/ {saved.toFixed(2)} PEN
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-white/50 block">Destino:</span>
                    <span className="text-xs font-bold text-white">Mi Yo del Futuro</span>
                  </div>
                </div>

                <p className="text-[11px] text-white/80 mt-2.5 pt-2 border-t border-white/10 leading-snug">
                  🎉 ¡Sin darte cuenta ya estás construyendo tu jubilación! Este ahorro creció un paso más.
                </p>
              </div>

              {/* Receipt Breakdown */}
              <div className="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-white/70">
                  <span>Comercio:</span>
                  <span className="font-semibold text-white">{merchant.name}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Monto pagado:</span>
                  <span className="font-semibold text-white">S/ {merchant.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#04c4b3] font-medium pt-1 border-t border-white/10">
                  <span>Apartado a tu retiro:</span>
                  <span className="font-mono font-bold">+S/ {saved.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Back to Home Button */}
            <div className="pt-4">
              <button
                onClick={handleFinish}
                className="w-full py-4 rounded-2xl bg-[#04c4b3] hover:opacity-95 text-black font-bold text-sm shadow-glow-teal transition active:scale-95"
              >
                Volver a mi Bóveda
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
