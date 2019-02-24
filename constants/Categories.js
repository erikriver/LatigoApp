import R from 'ramda';

export const categoriesTypes = {
  expense: 'Expense',
  income: 'Income',
  debtLoan: 'Debt/Loan',
};

export const isExpense = type => type === categoriesTypes.expense;

export const isIncome = type => type === categoriesTypes.income;

//INCOME CATEGORIES
const incomeCategories = [{
    name: 'Salario',
    icon: '015cash',
    isIncome: true,
    type: categoriesTypes.income,
  },
  {
    name: 'Ahorros',
    icon: '024coin',
    isIncome: true,
    type: categoriesTypes.income,
  },
  {
    name: 'Depositos',
    icon: '010businessandfinance1',
    isIncome: true,
    type: categoriesTypes.income,
  },{
    name: 'Ventas',
    icon: '028pricetag',
    isIncome: true,
    type: categoriesTypes.income,
  },{
    name: 'Otros',
    icon: '051box',
    isIncome: true,
    type: categoriesTypes.income,
  },
];

//EXPENSE CATEGORIES
const expenseCategories = [
  {
    name: 'Retiros',
    icon: '019atm',
    isIncome: false,
    type: categoriesTypes.expense,
  },
  {
    name: 'Comida y Bebidas',
    icon: '040dinner',
    isIncome: false,
    type: categoriesTypes.expense,
    children: [
      {
        name: 'Restaurantes',
        icon: '038foodandrestaurant',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Cafe',
        icon: 'cafee',
        isIncome: false,
        type: categoriesTypes.expense
      },
    ]
  },
  {
    name: 'Amistad',
    icon: '034heart',
    isIncome: false,
    type: categoriesTypes.expense
  },
  {
    name: 'Pagos',
    icon: '045receipt',
    isIncome: false,
    type: categoriesTypes.expense,
    children: [
      {
        name: 'Renta',
        icon: 'food',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Telefono',
        icon: 'cafee',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Agua',
        icon: 'cafee',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Electicidad',
        icon: 'cafee',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Gas',
        icon: 'cafee',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Television',
        icon: 'cafee',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Internet',
        icon: 'cafee',
        isIncome: false,
        type: categoriesTypes.expense
      },
    ]
  },
  {
    name: 'Transporte',
    icon: '043loan',
    isIncome: false,
    type: categoriesTypes.expense,
    children: [
      {
        name: 'Taxi',
        icon: 'cafee',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Estacionamiento',
        icon: 'cafee',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Gasolina',
        icon: 'cafee',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Mantenimiento',
        icon: 'cafee',
        isIncome: false,
        type: categoriesTypes.expense
      },
    ]
  },
  {
    name: 'Compras',
    icon: '023businessandfinance',
    isIncome: false,
    type: categoriesTypes.expense,
    children: [
      {
        name: 'Ropa',
        icon: 'cafee',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Accesorios',
        icon: 'cafee',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Electronicos',
        icon: 'cafee',
        isIncome: false,
        type: categoriesTypes.expense
      },
    ]
  },
  {
    name: 'Entretenimiento',
    icon: '039ticket',
    isIncome: false,
    type: categoriesTypes.expense,
    children: [
      {
        name: 'Peliculas',
        icon: 'cafee',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Juegos',
        icon: 'cafee',
        isIncome: false,
        type: categoriesTypes.expense
      },
    ]
  },
  {
    name: 'Vajes',
    icon: '042hotairballoon',
    isIncome: false,
    type: categoriesTypes.expense
  },
  {
    name: 'Salud & Fitness',
    icon: '030heart1',
    isIncome: false,
    type: categoriesTypes.expense,
    children: [
      {
        name: 'Farmacia',
        icon: 'gift',
        isIncome: false,
        type: categoriesTypes.expense
      },{
        name: 'Cuidado personal',
        icon: 'gift',
        isIncome: false,
        type: categoriesTypes.expense
      },{
        name: 'Deportes',
        icon: 'gift',
        isIncome: false,
        type: categoriesTypes.expense
      },{
        name: 'Doctor',
        icon: 'gift',
        isIncome: false,
        type: categoriesTypes.expense
      },
    ]
  },
  {
    name: 'Donaciones y Regalos',
    icon: '034heart',
    isIncome: false,
    type: categoriesTypes.expense,
    children: [
      {
        name: 'Viajes',
        icon: 'Marriage',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Funeral',
        icon: 'gift',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Caridad',
        icon: 'gift',
        isIncome: false,
        type: categoriesTypes.expense
      },
    ]
  },
  {
    name: 'Hogar y Familia',
    icon: '026mortgage',
    isIncome: false,
    type: categoriesTypes.expense,
    children: [
      {
        name: 'Niños',
        icon: 'gift',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Mejoras en hogar',
        icon: 'gift',
        isIncome: false,
        type: categoriesTypes.expense
      },
      {
        name: 'Servicios hogar',
        icon: 'gift',
        isIncome: false,
        type: categoriesTypes.expense
      },
    ]
  },
  // {
  //   name: 'Pets',
  //   icon: 'dumbbell',
  //   isIncome: false,
  //   type: categoriesTypes.expense
  // },
  {
    name: 'Educación',
    icon: '074scholarship',
    isIncome: false,
    type: categoriesTypes.expense,
    children:[
      {
        name: 'Libros',
        icon: 'gift',
        isIncome: false,
        type: categoriesTypes.expense
      },
    ]
  },
  {
    name: 'Inversiones',
    icon: '018payment2',
    isIncome: false,
    type: categoriesTypes.expense
  },
  {
    name: 'Negocios',
    icon: '044invest',
    isIncome: false,
    type: categoriesTypes.expense
  },
  {
    name: 'Seguros',
    icon: '020insurance',
    isIncome: false,
    type: categoriesTypes.expense
  },
  {
    name: 'Otros',
    icon: '051box',
    isIncome: false,
    type: categoriesTypes.expense
  },
];

//DEBT LOAN CATEGORIES
const debtLoanCategories = [{
    name: 'Prestamos',
    icon: '025pay',
    type: categoriesTypes.income,
    isIncome: true
  },
  {
    name: 'Cobros',
    icon: '077payment1',
    type: categoriesTypes.income,
    isIncome: true
  },
  {
    name: 'Deuda',
    icon: '018payment2',
    type: categoriesTypes.income,
    isIncome: false
  },
  {
    name: 'Recargos',
    icon: '075moneyexchange',
    type: categoriesTypes.income,
    isIncome: false
  },
];
const withType = type => category => ({ ...category,type});
const allWithType = type => R.map(withType(type));

export const defaultCategories = [
  ...allWithType(categoriesTypes.income)(incomeCategories),
  ...allWithType(categoriesTypes.expense)(expenseCategories),
  ...allWithType(categoriesTypes.debtLoan)(debtLoanCategories),
];