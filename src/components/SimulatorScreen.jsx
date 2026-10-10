import React, { useState } from 'react';
import { ArrowLeft, Sparkles, TrendingUp, Calendar, Compass, Shield, Award } from 'lucide-react';

export default function SimulatorScreen({ user, currentBalance, onBack }) {
  const [dailyMicroSaving, setDailyMicroSaving] = useState(6); // S/ 6 diarios promedio
  const [returnRate, setReturnRate] = useState(7); // 7% TEA fondo previsional

  // Formula interés compuesto mensual a 40 años (de los 22 a los 62)
  const years = 40;
  const months = years * 12;
  const monthlyDeposit = dailyMicroSaving * 30;
  const monthlyRate = (returnRate / 100) / 12;

  // FV = P*(1+r)^n + PMT * [ ((1+r)^n - 1) / r ]
  const futureValue = (
    currentBalance * Math.pow(1 + monthlyRate, months) +
    monthlyDeposit * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  );

  const totalInvested = currentBalance + (monthlyDeposit * months);
  const totalInterest = futureValue - totalInvested;

  return (
    <div className="flex flex-col h-full overflow-y-auto p-5 space-y-6 bg-gradient-to-b from-[#000033] via-[#000844] to-[#0131a0]/30 text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <button 
          onClick={onBack}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1 text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>
        <div className="flex items-center gap-1.5 text-xs text-[#04c4b3] font-semibold bg-[#04c4b3]/10 px-2.5 py-1 rounded-full border border-[#04c4b3]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#ffb601]" />
          <span>Proyección a los 62 años</span>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-display font-bold leading-tight">
          El Poder de Tu Yo del Futuro
        </h2>
        <p className="text-xs text-white/70 mt-1 leading-relaxed">
          Mira cómo unas monedas redondeadas de tu café o salida hoy se convierten en un patrimonio sólido gracias al interés compuesto.
        </p>
      </div>

      {/* Hero Projected Amount */}
      <div className="p-6 rounded-3xl bg-gradient-to-tr from-[#0131a0] via-[#000844] to-[#04c4b3]/20 border border-[#04c4b3]/40 shadow-glow-teal text-center relative overflow-hidden">
        <div className="text-xs uppercase tracking-widest text-white/70 font-semibold">
          Fondo Estimado a tu Retiro
        </div>
        <div className="mt-2 text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#04c4b3] to-[#ffb601]">
          S/ {Math.round(futureValue).toLocaleString('es-PE')}
        </div>
        <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-[#04c4b3] font-medium bg-[#04c4b3]/20 px-3 py-1 rounded-full">
          <Award className="w-3.5 h-3.5 text-[#ffb601]" />
          <span>+S/ {Math.round(totalInterest).toLocaleString('es-PE')} solo en rentabilidad previsional</span>
        </div>
      </div>

      {/* Interactive Sliders */}
      <div className="space-y-4">
        {/* Slider 1: Microahorro Diario */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/80 font-medium">Microahorro diario estimado en consumos:</span>
            <span className="font-mono font-bold text-[#04c4b3] text-sm">S/ {dailyMicroSaving}.00 al día</span>
          </div>
          <input 
            type="range"
            min="2"
            max="25"
            step="1"
            value={dailyMicroSaving}
            onChange={(e) => setDailyMicroSaving(Number(e.target.value))}
            className="w-full accent-[#04c4b3] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-white/40">
            <span>S/ 2 (mínimo)</span>
            <span>S/ ~{dailyMicroSaving * 30} al mes</span>
            <span>S/ 25</span>
          </div>
        </div>

        {/* Slider 2: Rendimiento Anual del Fondo */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/80 font-medium">Rentabilidad anual estimada (TEA):</span>
            <span className="font-mono font-bold text-[#ffb601] text-sm">{returnRate}% TEA</span>
          </div>
          <input 
            type="range"
            min="4"
            max="10"
            step="0.5"
            value={returnRate}
            onChange={(e) => setReturnRate(Number(e.target.value))}
            className="w-full accent-[#ffb601] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-white/40">
            <span>4% Conservador</span>
            <span>7% Moderado SBS</span>
            <span>10% Crecimiento</span>
          </div>
        </div>
      </div>

      {/* Comparative Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-[10px] uppercase font-bold text-white/50 block">Lo que tú aportas</span>
          <span className="text-lg font-bold font-mono text-white mt-1 block">
            S/ {Math.round(totalInvested).toLocaleString('es-PE')}
          </span>
          <span className="text-[10px] text-white/60">Gasto invisible día a día</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#04c4b3]/10 border border-[#04c4b3]/30">
          <span className="text-[10px] uppercase font-bold text-[#04c4b3] block">Interés Compuesto</span>
          <span className="text-lg font-bold font-mono text-[#04c4b3] mt-1 block">
            S/ {Math.round(totalInterest).toLocaleString('es-PE')}
          </span>
          <span className="text-[10px] text-white/60">Multiplicado en el tiempo</span>
        </div>
      </div>

      {/* Educational Reassurance SBS */}
      <div className="p-3.5 rounded-2xl bg-[#0131a0]/30 border border-[#0131a0] flex items-start gap-2.5 text-xs text-white/80">
        <Shield className="w-5 h-5 text-[#04c4b3] shrink-0 mt-0.5" />
        <p className="text-[11px] leading-tight">
          Supervisado bajo las directivas de educación previsional de la <strong>SBS</strong>. Este ahorro no se gasta en impulsos y te garantiza independencia financiera en la madurez.
        </p>
      </div>
    </div>
  );
}
