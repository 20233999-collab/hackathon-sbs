export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-1',
    merchant: 'Starbucks Jockey Plaza',
    category: 'Cafetería & Ocio',
    method: 'Yape',
    iconType: 'yape',
    originalAmount: 24.50,
    savedAmount: 2.45,
    timestamp: 'Hoy, 09:15 AM',
    multiplierApplied: false
  },
  {
    id: 'tx-2',
    merchant: 'Tambomart San Isidro',
    category: 'Conveniencia',
    method: 'Plin',
    iconType: 'plin',
    originalAmount: 18.20,
    savedAmount: 1.82,
    timestamp: 'Ayer, 08:40 PM',
    multiplierApplied: false
  },
  {
    id: 'tx-3',
    merchant: 'Uber Viajes Lima',
    category: 'Transporte',
    method: 'Visa Débito',
    iconType: 'card',
    originalAmount: 32.00,
    savedAmount: 6.40,
    timestamp: 'Sábado, 11:20 PM',
    multiplierApplied: true // Fin de semana booster x2
  },
  {
    id: 'tx-4',
    merchant: 'Cineplanet Salaverry',
    category: 'Entretenimiento',
    method: 'Yape',
    iconType: 'yape',
    originalAmount: 45.00,
    savedAmount: 9.00,
    timestamp: 'Viernes, 07:10 PM',
    multiplierApplied: true
  }
];

export const MOCK_USER = {
  name: 'Mateo Quispe',
  age: 22,
  occupation: 'Estudiante & Practicante',
  dni: '74829103',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  currentVaultBalance: 1482.50,
  monthlySaved: 142.80,
  retirementGoalAge: 65,
  currentAge: 22,
  vaultRank: 'Nivel 4: Constructor Previsional ⚡',
  streakDays: 14
};

export const QUICK_MERCHANTS = [
  { name: 'Starbucks Café', method: 'Yape', amount: 19.50, category: 'Cafetería' },
  { name: 'Rappi Almuerzo', method: 'Plin', amount: 34.00, category: 'Comida' },
  { name: 'Tambo snacks', method: 'Yape', amount: 12.80, category: 'Snacks' },
  { name: 'PlazaVea Express', method: 'Visa Débito', amount: 56.40, category: 'Supermercado' },
];
