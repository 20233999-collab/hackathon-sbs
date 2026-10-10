import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import PermissionsScreen from './components/PermissionsScreen';
import DashboardScreen from './components/DashboardScreen';
import SimulatorScreen from './components/SimulatorScreen';
import { INITIAL_TRANSACTIONS, MOCK_USER } from './data/mockData';
import { Moon, Sun, Smartphone, Shield, Sparkles } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login' | 'permissions' | 'dashboard' | 'simulator'
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [user, setUser] = useState(MOCK_USER);

  // User savings customization settings
  const [settings, setSettings] = useState({
    percentage: 5,        // 5% del consumo
    roundUp: true,        // Redondear al sol superior
    weekendBooster: true, // 2x en fines de semana
    minAmount: 0          // Desde S/ 0 (todo gasto)
  });

  // Handler to add a simulated transaction in real-time
  const handleSimulateTransaction = (newTx) => {
    const formattedTx = {
      id: `tx-${Date.now()}`,
      merchant: newTx.merchant,
      category: newTx.category,
      method: newTx.method,
      iconType: newTx.method.toLowerCase(),
      originalAmount: newTx.originalAmount,
      savedAmount: newTx.savedAmount,
      timestamp: 'Justo ahora',
      multiplierApplied: newTx.multiplierApplied
    };

    setTransactions([formattedTx, ...transactions]);

    // Update user balance
    setUser(prev => ({
      ...prev,
      currentVaultBalance: Number((prev.currentVaultBalance + newTx.savedAmount).toFixed(2)),
      monthlySaved: Number((prev.monthlySaved + newTx.savedAmount).toFixed(2))
    }));
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-3 sm:p-6 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#000022]' : 'bg-slate-100'
    }`}>
      {/* Top Banner / Demo Controls */}
      <div className="w-full max-w-sm mb-3 flex items-center justify-between px-2 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#04c4b3] animate-pulse" />
          <span className={`font-mono text-[11px] font-bold ${isDarkMode ? 'text-white/80' : 'text-slate-700'}`}>
            PROTOTIPO HACKATHON SBS 2026
          </span>
        </div>

        {/* Theme Toggle & Fast Screen Switcher */}
        <div className="flex items-center gap-2">
          <select 
            value={currentScreen}
            onChange={(e) => setCurrentScreen(e.target.value)}
            className={`text-[10px] rounded-lg px-2 py-1 font-mono font-medium outline-none border ${
              isDarkMode 
                ? 'bg-white/10 text-white border-white/20' 
                : 'bg-white text-slate-800 border-slate-300'
            }`}
          >
            <option value="login" className="text-black">1. Login</option>
            <option value="permissions" className="text-black">2. Permisos</option>
            <option value="dashboard" className="text-black">3. Bóveda</option>
            <option value="simulator" className="text-black">4. Simulador 60</option>
          </select>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-1.5 rounded-lg border transition ${
              isDarkMode 
                ? 'bg-white/10 text-[#ffb601] border-white/20 hover:bg-white/20' 
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
            title="Cambiar Modo Claro/Oscuro"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* SMARTPHONE MOBILE FRAME (Mockup iPhone 15 Pro) */}
      <div className={`w-full max-w-[390px] h-[780px] rounded-[44px] shadow-2xl relative flex flex-col overflow-hidden border-[8px] transition-all duration-300 ${
        isDarkMode 
          ? 'bg-[#000033] border-[#1e2238] shadow-[0_25px_60px_-15px_rgba(4,196,179,0.3)]' 
          : 'bg-white border-slate-300 shadow-xl'
      }`}>
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#04c4b3]/30" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
        </div>

        {/* Screen Content Wrapper */}
        <div className={`w-full h-full pt-8 relative overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
          {currentScreen === 'login' && (
            <LoginScreen 
              onLoginSuccess={() => setCurrentScreen('permissions')} 
            />
          )}

          {currentScreen === 'permissions' && (
            <PermissionsScreen 
              onComplete={() => setCurrentScreen('dashboard')} 
            />
          )}

          {currentScreen === 'dashboard' && (
            <DashboardScreen 
              user={user}
              transactions={transactions}
              settings={settings}
              setSettings={setSettings}
              onSimulateTransaction={handleSimulateTransaction}
              onOpenSimulator={() => setCurrentScreen('simulator')}
            />
          )}

          {currentScreen === 'simulator' && (
            <SimulatorScreen 
              user={user}
              currentBalance={user.currentVaultBalance}
              onBack={() => setCurrentScreen('dashboard')}
            />
          )}
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-50 pointer-events-none" />
      </div>

      {/* Pitch Quick Hints */}
      <div className="mt-3 text-center text-[11px] text-white/50 max-w-sm">
        💡 <strong className="text-white/80">Tip de demo:</strong> En la Bóveda pulsa en cualquier comercio (ej. Starbucks) para ver cómo suma en vivo a tu retiro con confeti y animación.
      </div>
    </div>
  );
}
