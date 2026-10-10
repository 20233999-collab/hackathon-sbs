import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sliders, 
  Zap, 
  Clock, 
  ChevronRight, 
  Flame,
  Wallet
} from 'lucide-react';
import SettingsBottomSheet from './SettingsBottomSheet';
import WalletCheckoutModal from './WalletCheckoutModal';

export default function DashboardScreen({
  user,
  transactions,
  onSimulateTransaction,
  settings,
  setSettings,
  onOpenSimulator
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-16 p-5 space-y-5 relative">
      {/* Header Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <img 
            src={user.avatarUrl} 
            alt={user.name} 
            className="w-9 h-9 rounded-full border border-[#04c4b3]/60 object-cover"
          />
          <div>
            <h3 className="text-xs font-bold text-white leading-none">{user.name}</h3>
            <span className="text-[10px] text-[#04c4b3] font-medium flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#04c4b3]" />
              Bóveda SBS Activa
            </span>
          </div>
        </div>

        {/* Action to Simulator */}
        <button 
          onClick={onOpenSimulator}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/90 flex items-center gap-1.5 transition active:scale-95"
        >
          <TrendingUp className="w-3.5 h-3.5 text-[#04c4b3]" />
          <span>Proyección 60</span>
        </button>
      </div>

      {/* Core Vault Card ("Mi Yo del Futuro") */}
      <div className="relative rounded-3xl p-6 bg-gradient-to-br from-[#0131a0]/30 via-[#000844] to-[#000033] border border-[#04c4b3]/30 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-white/60 font-semibold flex items-center gap-1.5">
            Mi Yo del Futuro
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#ffb601]/15 text-[#ffb601] border border-[#ffb601]/25 text-[10px] font-bold flex items-center gap-1">
            <Flame className="w-3 h-3" />
            14 días seguidos
          </span>
        </div>

        <div className="mt-3">
          <span className="text-[11px] text-white/50 block font-normal">Ahorro previsional acumulado</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-sm font-bold text-[#04c4b3] font-mono">S/</span>
            <span className="text-4xl font-display font-extrabold tracking-tight text-white">
              {user.currentVaultBalance.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-white/70">
            <TrendingUp className="w-3.5 h-3.5 text-[#04c4b3]" />
            <span>+S/ {user.monthlySaved.toFixed(2)} este mes</span>
          </div>
          <span className="text-[10px] text-white/50 font-mono">
            7% TEA Fondo SBS
          </span>
        </div>
      </div>

      {/* Botón Principal POV: "Mi Billetera Digital" (Simular Pago Real) */}
      <button
        onClick={() => setIsCheckoutOpen(true)}
        className="w-full p-4 rounded-3xl bg-gradient-to-r from-[#04c4b3] to-[#0131a0] text-white shadow-glow-teal hover:opacity-95 active:scale-[0.98] transition flex items-center justify-between group"
      >
        <div className="flex items-center gap-3 text-left">
          <div className="w-11 h-11 rounded-2xl bg-black/20 flex items-center justify-center text-white">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold leading-tight">Simular Pago en Billetera</h4>
            <p className="text-xs text-white/80 mt-0.5">Paga con Yape o Plin y mira el microahorro</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
          <ChevronRight className="w-4 h-4 text-white stroke-[3]" />
        </div>
      </button>

      {/* Tarjeta de Configuración de Reglas (Simple & Discreta) */}
      <div 
        onClick={() => setIsSettingsOpen(true)}
        className="p-4 rounded-2xl bg-white/5 hover:bg-white/8 border border-white/10 transition cursor-pointer flex items-center justify-between group active:scale-[0.99]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0131a0]/30 border border-[#0131a0]/50 flex items-center justify-center text-[#04c4b3]">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-white">Reglas del Microahorro</h4>
              <span className="text-[10px] bg-[#04c4b3]/20 text-[#04c4b3] px-2 py-0.2 rounded-full font-mono font-semibold">
                {settings.percentage}% activo
              </span>
            </div>
            <p className="text-[11px] text-white/60 mt-0.5">
              {settings.roundUp ? 'Redondeo activado' : 'Sin redondeo'} 
              {settings.weekendBooster ? ' • Finde 2X' : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center text-xs text-white/40 group-hover:text-white/80 transition">
          <span className="text-[11px] mr-1">Personalizar</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Feed de Actividad Reciente */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#04c4b3]" />
            Últimos Microahorros
          </span>
          <span className="text-[10px] text-white/40">{transactions.length} registros</span>
        </div>

        <div className="space-y-1.5">
          {transactions.slice(0, 4).map((tx) => (
            <div
              key={tx.id}
              className="p-3 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                  tx.method === 'Yape' ? 'bg-[#742284] text-white' : tx.method === 'Plin' ? 'bg-[#00a9e0] text-black' : 'bg-[#0131a0] text-white'
                }`}>
                  {tx.method === 'Yape' ? 'Y' : tx.method === 'Plin' ? 'P' : '💳'}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white leading-tight">{tx.merchant}</h4>
                  <span className="text-[10px] text-white/50">{tx.timestamp} • S/ {tx.originalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-[#04c4b3] block">
                  +S/ {tx.savedAmount.toFixed(2)}
                </span>
                {tx.multiplierApplied && (
                  <span className="text-[9px] text-[#ffb601] font-medium block">
                    2X Finde
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Realista POV: Checkout Billetera Digital */}
      <WalletCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        settings={settings}
        onPaymentSuccess={onSimulateTransaction}
      />

      {/* Bottom Sheet de Ajustes */}
      <SettingsBottomSheet
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        setSettings={setSettings}
      />
    </div>
  );
}
