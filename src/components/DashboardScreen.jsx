import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Sliders, 
  Zap, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { QUICK_MERCHANTS } from '../data/mockData';
import SettingsBottomSheet from './SettingsBottomSheet';

export default function DashboardScreen({
  user,
  transactions,
  onSimulateTransaction,
  settings,
  setSettings,
  onOpenSimulator
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activePaymentToast, setActivePaymentToast] = useState(null);
  const [selectedMerchant, setSelectedMerchant] = useState(null);

  // Trigger quick simulation with clean, non-invasive feedback
  const handleQuickPayment = (merchant) => {
    setSelectedMerchant(merchant.name);

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

    // Instant data commit
    onSimulateTransaction({
      merchant: merchant.name,
      category: merchant.category,
      method: merchant.method,
      originalAmount: original,
      savedAmount: saved,
      multiplierApplied: settings.weekendBooster
    });

    // Native-like Dynamic Island notification
    setActivePaymentToast({
      merchant: merchant.name,
      method: merchant.method,
      savedAmount: saved
    });

    setTimeout(() => {
      setActivePaymentToast(null);
      setSelectedMerchant(null);
    }, 2800);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-16 p-5 space-y-5 relative">
      {/* Dynamic Island / Native Notification Popover */}
      {activePaymentToast && (
        <div className="absolute top-2 left-4 right-4 z-40 bg-[#000844]/95 border border-[#04c4b3]/60 backdrop-blur-md rounded-2xl p-3 shadow-2xl flex items-center justify-between text-white animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#04c4b3]/20 text-[#04c4b3] flex items-center justify-center font-bold text-xs">
              ✓
            </div>
            <div>
              <div className="text-xs font-bold leading-none flex items-center gap-1.5">
                <span>{activePaymentToast.merchant}</span>
                <span className="text-[10px] text-[#04c4b3] font-mono">({activePaymentToast.method})</span>
              </div>
              <p className="text-[10px] text-white/60 mt-0.5">Microahorro enviado con éxito</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-[#04c4b3] bg-[#04c4b3]/15 px-2 py-1 rounded-lg border border-[#04c4b3]/30">
            +S/ {activePaymentToast.savedAmount.toFixed(2)}
          </span>
        </div>
      )}

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
              Bóveda activa SBS
            </span>
          </div>
        </div>

        {/* Action to Simulator */}
        <button 
          onClick={onOpenSimulator}
          className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-white/90 flex items-center gap-1.5 transition active:scale-95"
        >
          <TrendingUp className="w-3.5 h-3.5 text-[#04c4b3]" />
          <span>Proyección 60</span>
        </button>
      </div>

      {/* Core Vault Card (Clean, Quiet Elegance) */}
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
            Rentabilidad SBS: 7% TEA
          </span>
        </div>
      </div>

      {/* Single Pilot Control Card (Calm & Non-Invasive) */}
      <div 
        onClick={() => setIsSettingsOpen(true)}
        className="p-4 rounded-2xl bg-white/5 hover:bg-white/8 border border-white/10 transition cursor-pointer flex items-center justify-between group active:scale-[0.99]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0131a0]/40 border border-[#0131a0] flex items-center justify-center text-[#04c4b3]">
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
          <span className="text-[11px] mr-1">Editar</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Seamless One-Tap Simulator (Discreet Demo Helper) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-[#ffb601]" />
            Simulador de Pagos Rápidos
          </span>
          <span className="text-[10px] text-white/40 font-mono">Prueba un toque</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {QUICK_MERCHANTS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickPayment(item)}
              className={`p-3 rounded-2xl border text-left transition-all active:scale-95 flex flex-col justify-between ${
                selectedMerchant === item.name
                  ? 'bg-[#04c4b3]/15 border-[#04c4b3]'
                  : 'bg-white/5 hover:bg-white/10 border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">{item.name}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${
                  item.method === 'Yape' ? 'bg-[#742284] text-white' : item.method === 'Plin' ? 'bg-[#00a9e0] text-black' : 'bg-white/20 text-white'
                }`}>
                  {item.method}
                </span>
              </div>
              <div className="mt-2 flex items-baseline justify-between text-xs">
                <span className="text-white/50 text-[11px]">S/ {item.amount.toFixed(2)}</span>
                <span className="text-[10px] font-mono font-bold text-[#04c4b3]">+ahorro</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Clean Transaction Timeline */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#04c4b3]" />
            Actividad Reciente
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

      {/* Bottom Sheet for Granular Settings */}
      <SettingsBottomSheet
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        setSettings={setSettings}
      />
    </div>
  );
}
