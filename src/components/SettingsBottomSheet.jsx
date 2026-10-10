import React from 'react';
import { X, Check, Sliders, Sparkles, HelpCircle } from 'lucide-react';

export default function SettingsBottomSheet({ isOpen, onClose, settings, setSettings }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-200">
      {/* Backdrop tap to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Sheet Modal */}
      <div className="relative w-full max-w-[390px] bg-[#000033] dark:bg-[#000033] border-t border-white/15 rounded-t-[32px] p-6 text-white shadow-2xl z-10 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
        {/* Grab bar */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-5" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#04c4b3]" />
            <h3 className="text-base font-display font-bold text-white">Reglas del Microahorro</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-white/70 mb-5 leading-relaxed">
          Ajusta cómo y cuánto apartas para tu <strong>Yo del Futuro</strong> en cada compra de forma invisible.
        </p>

        <div className="space-y-4">
          {/* 1. Porcentaje del Consumo */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="font-semibold text-white/90">Porcentaje por compra</span>
              <span className="font-mono font-bold text-[#04c4b3]">{settings.percentage}%</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[3, 5, 8, 10].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setSettings(s => ({ ...s, percentage: pct }))}
                  className={`py-2 rounded-xl text-xs font-bold transition active:scale-95 ${
                    settings.percentage === pct
                      ? 'bg-[#04c4b3] text-black shadow-glow-teal'
                      : 'bg-white/10 text-white/80 hover:bg-white/15'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* 2. Redondeo al Sol */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white">Redondeo al Sol Superior</h4>
              <p className="text-[11px] text-white/60">Gasto de S/ 7.30 redondea a S/ 8 (ahorra S/ 0.70)</p>
            </div>
            <button
              onClick={() => setSettings(s => ({ ...s, roundUp: !s.roundUp }))}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 active:scale-95 ${
                settings.roundUp ? 'bg-[#04c4b3]' : 'bg-white/20'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.roundUp ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* 3. Multiplicador Finde (Booster 2X) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-white/5 to-[#ffb601]/10 border border-[#ffb601]/20 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#ffb601]" />
                Multiplicador Fin de Semana (2X)
              </h4>
              <p className="text-[11px] text-white/60">Duplica el ahorro los viernes y sábados de noche</p>
            </div>
            <button
              onClick={() => setSettings(s => ({ ...s, weekendBooster: !s.weekendBooster }))}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 active:scale-95 ${
                settings.weekendBooster ? 'bg-[#ffb601]' : 'bg-white/20'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-black transition-transform ${
                settings.weekendBooster ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* 4. Monto Mínimo */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="font-semibold text-white/90">Gasto mínimo para activar:</span>
              <span className="font-mono text-[#04c4b3] font-bold">
                {settings.minAmount === 0 ? 'Sin límite' : `> S/ ${settings.minAmount}.00`}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 10, 20].map((m) => (
                <button
                  key={m}
                  onClick={() => setSettings(s => ({ ...s, minAmount: m }))}
                  className={`py-1.5 rounded-xl text-xs font-medium transition active:scale-95 ${
                    settings.minAmount === m
                      ? 'bg-[#0131a0] text-white border border-[#04c4b3]'
                      : 'bg-white/10 text-white/70'
                  }`}
                >
                  {m === 0 ? 'Siempre' : `> S/ ${m}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#04c4b3] to-[#0131a0] text-white font-semibold text-xs shadow-glow-teal hover:opacity-95 active:scale-[0.98] transition"
        >
          Guardar Preferencias
        </button>
      </div>
    </div>
  );
}
