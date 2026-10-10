import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Lock, Sparkles, Smartphone, Fingerprint } from 'lucide-react';

export default function LoginScreen({ onLoginSuccess }) {
  const [dni, setDni] = useState('74829103');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 700);
  };

  return (
    <div className="flex flex-col h-full justify-between p-6 bg-gradient-to-b from-[#000033] via-[#000844] to-[#0131a0]/30 text-white">
      {/* Top branding */}
      <div className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0131a0] to-[#04c4b3] flex items-center justify-center shadow-glow-teal font-display font-bold text-xl text-white">
              B
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-wider text-white">BÓVEDA</span>
              <span className="block text-[10px] text-[#04c4b3] font-semibold tracking-widest uppercase">SBS Previsional 2026</span>
            </div>
          </div>
          <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-[#04c4b3]/20 text-[#04c4b3] border border-[#04c4b3]/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#ffb601]" />
            Gen Z Ready
          </span>
        </div>

        {/* Hero title */}
        <div className="mt-12 space-y-2">
          <h1 className="text-3xl font-display font-bold leading-tight">
            Tu dinero de hoy, <br />
            construyendo a tu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#04c4b3] via-[#ffb601] to-[#04c4b3] animate-pulse">
              Yo del Futuro.
            </span>
          </h1>
          <p className="text-xs text-white/70 leading-relaxed pt-2">
            Cada vez que pagues con <strong className="text-white">Yape, Plin o Tarjeta</strong>, un microahorro automático viajará silenciosamente a tu retiro.
          </p>
        </div>
      </div>

      {/* Form / Quick Access */}
      <div className="my-auto py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/80 mb-1.5 flex items-center justify-between">
              <span>Número de DNI / Documento</span>
              <span className="text-[10px] text-[#04c4b3]">Usuario Verificado SBS</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="w-full bg-[#e1f0fa]/10 border border-white/20 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#04c4b3] focus:ring-1 focus:ring-[#04c4b3] transition tracking-wider font-mono"
                placeholder="Ingresa tu DNI"
              />
              <ShieldCheck className="w-5 h-5 text-[#04c4b3] absolute right-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#04c4b3] to-[#0131a0] hover:opacity-95 active:scale-[0.98] transition font-semibold text-sm text-white shadow-glow-teal flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Ingresar al Prototipo</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onLoginSuccess}
            className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 flex items-center justify-center gap-2 transition"
          >
            <Fingerprint className="w-4 h-4 text-[#04c4b3]" />
            <span>Acceso biométrico rápido (Face ID)</span>
          </button>
        </form>
      </div>

      {/* Footer reassurance */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
        <span className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-[#04c4b3]" />
          Regulación SBS & Billeteras Abiertas
        </span>
        <span className="font-mono text-[10px] text-white/40">v1.0 MVP</span>
      </div>
    </div>
  );
}
