import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Sliders, 
  Zap, 
  CreditCard, 
  CheckCircle2, 
  ArrowUpRight, 
  HelpCircle,
  Clock,
  ShieldCheck,
  ChevronRight,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUICK_MERCHANTS } from '../data/mockData';

export default function DashboardScreen({
  user,
  transactions,
  onSimulateTransaction,
  settings,
  setSettings,
  onOpenSimulator
}) {
  const [selectedQuickIndex, setSelectedQuickIndex] = useState(0);
  const [customAmount, setCustomAmount] = useState('25.00');
  const [customMerchant, setCustomMerchant] = useState('Yape Café');
  const [isSimulating, setIsSimulating] = useState(false);
  const [showQuickModal, setShowQuickModal] = useState(false);

  // Trigger quick demo purchase
  const handleTriggerQuickSim = (merchantObj) => {
    setIsSimulating(true);

    // Calculate micro-savings based on rules
    let basePct = settings.percentage / 100;
    let original = merchantObj.amount;
    let saved = original * basePct;

    if (settings.roundUp) {
      const ceil = Math.ceil(original);
      const diff = Number((ceil - original).toFixed(2));
      if (diff > 0) {
        saved += diff;
      } else {
        saved += 1.0; // si ya era entero, redondeo a siguiente sol
      }
    }

    if (settings.weekendBooster) {
      saved = saved * 2;
    }

    saved = Number(saved.toFixed(2));

    setTimeout(() => {
      onSimulateTransaction({
        merchant: merchantObj.name,
        category: merchantObj.category,
        method: merchantObj.method,
        originalAmount: original,
        savedAmount: saved,
        multiplierApplied: settings.weekendBooster
      });

      // Confetti burst
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#04c4b3', '#ffb601', '#0131a0']
      });

      setIsSimulating(false);
      setShowQuickModal(false);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-20 p-5 space-y-6">
      {/* User Mini Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <img 
            src={user.avatarUrl} 
            alt={user.name} 
            className="w-10 h-10 rounded-full border-2 border-[#04c4b3] object-cover"
          />
          <div>
            <h3 className="text-sm font-bold text-white leading-tight flex items-center gap-1.5">
              {user.name}
              <span className="w-2 h-2 rounded-full bg-[#04c4b3] animate-ping" />
            </h3>
            <p className="text-[11px] text-[#04c4b3] font-semibold">{user.vaultRank}</p>
          </div>
        </div>

        <button 
          onClick={onOpenSimulator}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0131a0] to-[#04c4b3]/30 border border-[#04c4b3]/40 text-xs font-semibold text-white flex items-center gap-1.5 hover:opacity-90 transition active:scale-95"
        >
          <TrendingUp className="w-3.5 h-3.5 text-[#04c4b3]" />
          <span>Ver Futuro 60</span>
        </button>
      </div>

      {/* Main Vault Balance Card ("Mi Yo del Futuro") */}
      <div className="relative rounded-3xl p-6 bg-gradient-to-br from-[#0131a0]/40 via-[#000844] to-[#000033] border border-[#04c4b3]/40 shadow-glow-teal overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#04c4b3]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#ffb601]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#04c4b3]" />
            <span className="text-xs uppercase font-bold tracking-widest text-white/70">Bóveda Previsional</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#ffb601]/20 text-[#ffb601] border border-[#ffb601]/30 text-[10px] font-bold flex items-center gap-1">
            <Flame className="w-3 h-3" />
            14 días seguidos
          </span>
        </div>

        <div className="mt-3 relative z-10">
          <div className="text-[11px] text-white/60 font-medium">Fondo total acumulado</div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-sm font-bold text-[#04c4b3] font-mono">S/</span>
            <span className="text-4xl font-display font-extrabold tracking-tight text-white">
              {user.currentVaultBalance.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
          <div className="flex items-center gap-1.5 text-white/80">
            <TrendingUp className="w-3.5 h-3.5 text-[#04c4b3]" />
            <span>+S/ {user.monthlySaved.toFixed(2)} este mes</span>
          </div>
          <span className="text-[11px] text-[#04c4b3] font-semibold bg-[#04c4b3]/10 px-2 py-0.5 rounded-lg border border-[#04c4b3]/20">
            Automático por consumo
          </span>
        </div>
      </div>

      {/* QUICK SIMULATION TRIGGER (Option C - Hero Action) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0131a0]/30 to-[#742284]/30 border border-white/15 relative">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#ffb601]" />
            Gatillador de Pago en Vivo (Demo)
          </h4>
          <span className="text-[10px] text-white/50">Simula una compra</span>
        </div>
        <p className="text-[11px] text-white/70 mb-3 leading-tight">
          Prueba cómo se descuenta el gasto en Yape/Plin y suma en tiempo real a tu Bóveda con tus reglas.
        </p>

        {/* Quick Merchant Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {QUICK_MERCHANTS.map((item, idx) => (
            <button
              key={idx}
              disabled={isSimulating}
              onClick={() => handleTriggerQuickSim(item)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-left transition flex flex-col justify-between active:scale-95"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-white truncate">{item.name}</span>
                <span className={`text-[9px] px-1 py-0.2 rounded font-mono font-bold ${
                  item.method === 'Yape' ? 'bg-[#742284] text-white' : item.method === 'Plin' ? 'bg-[#00a9e0] text-black' : 'bg-white/20 text-white'
                }`}>
                  {item.method}
                </span>
              </div>
              <div className="mt-1 flex items-baseline justify-between text-xs">
                <span className="text-white/60">Gasto:</span>
                <span className="font-bold text-[#04c4b3]">S/ {item.amount.toFixed(2)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CUSTOMIZATION PANEL (Settings de Microahorro) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#04c4b3]" />
            Personaliza tus Reglas de Ahorro
          </h3>
          <span className="text-[10px] text-[#04c4b3] font-mono font-semibold">100% Configurable</span>
        </div>

        {/* 1. Porcentaje del Gasto */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white/90">Porcentaje que viaja a tu Bóveda</span>
            <span className="text-sm font-bold text-[#04c4b3] font-mono">{settings.percentage}% del consumo</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[3, 5, 10, 15].map((pct) => (
              <button
                key={pct}
                onClick={() => setSettings(s => ({ ...s, percentage: pct }))}
                className={`py-2 rounded-xl text-xs font-bold transition ${
                  settings.percentage === pct
                    ? 'bg-[#04c4b3] text-black shadow-glow-teal'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
          <p className="text-[10px] text-white/50 leading-relaxed">
            Ejemplo: Si pagas un almuerzo de S/ 25.00, se guardan automáticamente S/ {(25 * settings.percentage / 100).toFixed(2)}.
          </p>
        </div>

        {/* 2. Redondeo al Sol Superior */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="space-y-0.5 pr-3">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Redondeo al Sol Superior</span>
              <span className="text-[9px] bg-[#ffb601]/20 text-[#ffb601] px-1.5 py-0.5 rounded font-mono font-semibold">Popular</span>
            </div>
            <p className="text-[11px] text-white/60 leading-tight">
              Si pagas S/ 8.20, redondea y envía S/ 1.80 a la Bóveda.
            </p>
          </div>
          <button
            onClick={() => setSettings(s => ({ ...s, roundUp: !s.roundUp }))}
            className={`w-12 h-7 rounded-full transition-colors relative p-1 ${
              settings.roundUp ? 'bg-[#04c4b3]' : 'bg-white/20'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              settings.roundUp ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* 3. Multiplicador Fin de Semana / Salidas (Booster) */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-white/5 to-[#ffb601]/10 border border-[#ffb601]/30 flex items-center justify-between">
          <div className="space-y-0.5 pr-3">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ffb601]" />
              <span>Multiplicador Salidas & Finde (2X)</span>
            </div>
            <p className="text-[11px] text-white/60 leading-tight">
              Duplica el microahorro durante viernes, sábados y domingos en salidas.
            </p>
          </div>
          <button
            onClick={() => setSettings(s => ({ ...s, weekendBooster: !s.weekendBooster }))}
            className={`w-12 h-7 rounded-full transition-colors relative p-1 ${
              settings.weekendBooster ? 'bg-[#ffb601]' : 'bg-white/20'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-black transition-transform ${
              settings.weekendBooster ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* 4. Monto Mínimo para Disparar Ahorro */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white/90">Ahorrar sólo a partir de:</span>
            <span className="font-mono text-[#04c4b3] font-bold">
              {settings.minAmount === 0 ? 'Sin mínimo' : `S/ ${settings.minAmount}.00`}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 10, 20].map((m) => (
              <button
                key={m}
                onClick={() => setSettings(s => ({ ...s, minAmount: m }))}
                className={`py-1.5 rounded-xl text-xs font-semibold transition ${
                  settings.minAmount === m
                    ? 'bg-[#0131a0] border border-[#04c4b3] text-white'
                    : 'bg-white/5 text-white/70'
                }`}
              >
                {m === 0 ? 'Todo gasto' : `> S/ ${m}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FEED DE TRANSACCIONES RECIENTES (Option C) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/90 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#04c4b3]" />
            Movimientos y Ahorro en Vivo
          </h3>
          <span className="text-[10px] text-white/50">{transactions.length} registrados</span>
        </div>

        <div className="space-y-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between transition"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shadow ${
                  tx.method === 'Yape' ? 'bg-[#742284] text-white' : tx.method === 'Plin' ? 'bg-[#00a9e0] text-black' : 'bg-[#0131a0] text-white'
                }`}>
                  {tx.method === 'Yape' ? 'Y' : tx.method === 'Plin' ? 'P' : '💳'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{tx.merchant}</h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-white/50 mt-0.5">
                    <span>{tx.timestamp}</span>
                    <span>•</span>
                    <span className="text-white/70">Gasto: S/ {tx.originalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-[#04c4b3] block">
                  +S/ {tx.savedAmount.toFixed(2)}
                </span>
                <span className="text-[9px] text-[#ffb601] font-medium block">
                  {tx.multiplierApplied ? 'Booster 2X 🔥' : 'a tu Bóveda'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
