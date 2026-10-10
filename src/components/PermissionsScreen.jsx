import React, { useState } from 'react';
import { Shield, Check, Lock, Wallet, ArrowRight, Info, Zap } from 'lucide-react';

export default function PermissionsScreen({ onComplete }) {
  const [wallets, setWallets] = useState({
    yape: true,
    plin: true,
    tarjetas: true,
  });

  const [acceptedDebit, setAcceptedDebit] = useState(true);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(true);

  const toggleWallet = (key) => {
    setWallets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const canProceed = acceptedDebit && acceptedPrivacy;

  return (
    <div className="flex flex-col h-full justify-between p-6 bg-gradient-to-b from-[#000033] via-[#000844] to-[#0131a0]/20 text-white overflow-y-auto">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-[#04c4b3]/20 text-[#04c4b3] text-xs font-bold flex items-center justify-center border border-[#04c4b3]/30">
            1
          </span>
          <span className="text-xs uppercase tracking-wider text-[#04c4b3] font-bold">Paso previo</span>
        </div>
        <h2 className="text-2xl font-display font-bold leading-tight">
          Permisos y Conexión de Billeteras
        </h2>
        <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
          Para que el microahorro ocurra de forma imperceptible, autorizas la lectura de transacciones y el desvío a tu Bóveda personal.
        </p>

        {/* Wallets Selector */}
        <div className="mt-6 space-y-3">
          <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wider block">
            Billeteras y Cuentas Vinculadas
          </span>

          {/* Yape */}
          <div 
            onClick={() => toggleWallet('yape')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              wallets.yape 
                ? 'bg-[#742284]/20 border-[#742284]/60 shadow-lg' 
                : 'bg-white/5 border-white/10 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#742284] flex items-center justify-center text-white font-bold text-sm shadow">
                Y
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Yape BCP
                  <span className="text-[10px] bg-[#742284]/40 text-[#d896e8] px-1.5 py-0.5 rounded font-mono">Activo</span>
                </h4>
                <p className="text-[11px] text-white/60">Lectura de QRs y pagos con número</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${wallets.yape ? 'bg-[#04c4b3] text-black' : 'border border-white/30'}`}>
              {wallets.yape && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </div>

          {/* Plin */}
          <div 
            onClick={() => toggleWallet('plin')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              wallets.plin 
                ? 'bg-[#00a9e0]/20 border-[#00a9e0]/60 shadow-lg' 
                : 'bg-white/5 border-white/10 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00a9e0] flex items-center justify-center text-white font-bold text-sm shadow">
                P
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Plin (BBVA, Scotiabank, Interbank)
                  <span className="text-[10px] bg-[#00a9e0]/40 text-[#9ae5fc] px-1.5 py-0.5 rounded font-mono">Activo</span>
                </h4>
                <p className="text-[11px] text-white/60">Interoperabilidad inmediata</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${wallets.plin ? 'bg-[#04c4b3] text-black' : 'border border-white/30'}`}>
              {wallets.plin && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </div>

          {/* Tarjetas */}
          <div 
            onClick={() => toggleWallet('tarjetas')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              wallets.tarjetas 
                ? 'bg-[#0131a0]/30 border-[#0131a0] shadow-lg' 
                : 'bg-white/5 border-white/10 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0131a0] to-[#04c4b3] flex items-center justify-center text-white font-bold text-sm shadow">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Tarjetas Débito / Crédito
                  <span className="text-[10px] bg-[#0131a0]/60 text-white/90 px-1.5 py-0.5 rounded font-mono">POS & Web</span>
                </h4>
                <p className="text-[11px] text-white/60">Visa / Mastercard vinculadas</p>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${wallets.tarjetas ? 'bg-[#04c4b3] text-black' : 'border border-white/30'}`}>
              {wallets.tarjetas && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </div>
        </div>

        {/* Legal & Consent Checks */}
        <div className="mt-6 space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10">
          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox"
              checked={acceptedDebit}
              onChange={() => setAcceptedDebit(!acceptedDebit)}
              className="mt-1 w-4 h-4 accent-[#04c4b3] rounded cursor-pointer"
            />
            <span className="text-xs text-white/80 leading-snug">
              Acepto el <strong>débito automático fraccional</strong> según el porcentaje y reglas configuradas en mi Bóveda.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox"
              checked={acceptedPrivacy}
              onChange={() => setAcceptedPrivacy(!acceptedPrivacy)}
              className="mt-1 w-4 h-4 accent-[#04c4b3] rounded cursor-pointer"
            />
            <span className="text-xs text-white/80 leading-snug">
              Autorizo el tratamiento de datos de gasto bajo los estándares de privacidad y supervisión de la <strong>SBS</strong>.
            </span>
          </label>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6">
        <button
          onClick={onComplete}
          disabled={!canProceed}
          className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-glow-teal ${
            canProceed 
              ? 'bg-gradient-to-r from-[#04c4b3] to-[#0131a0] text-white hover:opacity-95 active:scale-[0.98]' 
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          }`}
        >
          <span>Confirmar y Entrar a mi Bóveda</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
