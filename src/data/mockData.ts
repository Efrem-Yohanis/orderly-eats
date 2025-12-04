import { Staff, MenuItem, Order, Table, DailyStats } from '@/types/restaurant';

export const mockStaff: Staff[] = [
  { id: 'w1', name: 'Sarah Johnson', role: 'waiter', status: 'active', ordersCompleted: 45, avgTime: 12, rating: 4.8 },
  { id: 'w2', name: 'Mike Chen', role: 'waiter', status: 'active', ordersCompleted: 38, avgTime: 14, rating: 4.6 },
  { id: 'w3', name: 'Emily Davis', role: 'waiter', status: 'break', ordersCompleted: 32, avgTime: 11, rating: 4.9 },
  { id: 'c1', name: 'Marco Rossi', role: 'chef', status: 'active', ordersCompleted: 67, avgTime: 18, rating: 4.7 },
  { id: 'c2', name: 'Ana Martinez', role: 'chef', status: 'active', ordersCompleted: 52, avgTime: 20, rating: 4.5 },
  { id: 'k1', name: 'Kitchen Display', role: 'kitchen', status: 'active', ordersCompleted: 0, avgTime: 0, rating: 0 },
];

export const mockMenuItems: MenuItem[] = [
  { id: 'm1', name: 'Caesar Salad', price: 12.99, category: 'appetizers', cookingTime: 8, tags: ['gluten-free'], available: true },
  { id: 'm2', name: 'Spicy Wings', price: 14.99, category: 'appetizers', cookingTime: 15, tags: ['spicy'], available: true },
  { id: 'm3', name: 'Grilled Salmon', price: 28.99, category: 'main', cookingTime: 25, tags: ['gluten-free'], available: true },
  { id: 'm4', name: 'Pasta Carbonara', price: 18.99, category: 'main', cookingTime: 18, tags: [], available: true },
  { id: 'm5', name: 'Vegan Buddha Bowl', price: 16.99, category: 'main', cookingTime: 12, tags: ['vegan', 'gluten-free'], available: true },
  { id: 'm6', name: 'Tiramisu', price: 9.99, category: 'desserts', cookingTime: 5, tags: [], available: true },
  { id: 'm7', name: 'Chocolate Lava Cake', price: 11.99, category: 'desserts', cookingTime: 10, tags: [], available: false },
  { id: 'm8', name: 'Craft Beer', price: 7.99, category: 'drinks', cookingTime: 1, tags: ['gluten-free'], available: true },
  { id: 'm9', name: 'Signature Cocktail', price: 12.99, category: 'drinks', cookingTime: 3, tags: [], available: true },
];

export const mockTables: Table[] = [
  { id: 't1', number: 1, seats: 2, status: 'occupied', currentOrderId: 'o1' },
  { id: 't2', number: 2, seats: 4, status: 'vacant' },
  { id: 't3', number: 3, seats: 4, status: 'needs-attention', currentOrderId: 'o2' },
  { id: 't4', number: 4, seats: 6, status: 'occupied', currentOrderId: 'o3' },
  { id: 't5', number: 5, seats: 2, status: 'vacant' },
  { id: 't6', number: 6, seats: 8, status: 'occupied', currentOrderId: 'o4' },
  { id: 't7', number: 7, seats: 4, status: 'vacant' },
  { id: 't8', number: 8, seats: 2, status: 'vacant' },
];

export const mockOrders: Order[] = [
  {
    id: 'o1',
    tableNumber: 1,
    waiterId: 'w1',
    waiterName: 'Sarah Johnson',
    items: [
      { id: 'oi1', menuItem: mockMenuItems[0], quantity: 1, status: 'delivered' },
      { id: 'oi2', menuItem: mockMenuItems[2], quantity: 2, status: 'preparing' },
    ],
    status: 'preparing',
    priority: false,
    createdAt: new Date(Date.now() - 1200000),
    total: 70.97,
  },
  {
    id: 'o2',
    tableNumber: 3,
    waiterId: 'w2',
    waiterName: 'Mike Chen',
    items: [
      { id: 'oi3', menuItem: mockMenuItems[3], quantity: 2, status: 'ready' },
      { id: 'oi4', menuItem: mockMenuItems[5], quantity: 2, status: 'ready' },
    ],
    status: 'ready',
    priority: false,
    createdAt: new Date(Date.now() - 1800000),
    total: 57.96,
  },
  {
    id: 'o3',
    tableNumber: 4,
    waiterId: 'w1',
    waiterName: 'Sarah Johnson',
    items: [
      { id: 'oi5', menuItem: mockMenuItems[1], quantity: 1, status: 'pending' },
      { id: 'oi6', menuItem: mockMenuItems[4], quantity: 3, status: 'pending' },
    ],
    status: 'pending',
    priority: true,
    createdAt: new Date(Date.now() - 300000),
    total: 65.96,
  },
  {
    id: 'o4',
    tableNumber: 6,
    waiterId: 'w3',
    waiterName: 'Emily Davis',
    items: [
      { id: 'oi7', menuItem: mockMenuItems[8], quantity: 4, status: 'delivered' },
    ],
    status: 'delivered',
    priority: false,
    createdAt: new Date(Date.now() - 3600000),
    completedAt: new Date(Date.now() - 3000000),
    total: 51.96,
  },
];

export const mockDailyStats: DailyStats = {
  revenue: 4528.50,
  ordersCompleted: 87,
  avgPrepTime: 16,
  peakHour: '7:00 PM - 8:00 PM',
  topItems: [
    { name: 'Grilled Salmon', count: 24 },
    { name: 'Pasta Carbonara', count: 19 },
    { name: 'Caesar Salad', count: 17 },
    { name: 'Spicy Wings', count: 15 },
    { name: 'Signature Cocktail', count: 32 },
  ],
};

export const hourlyRevenue = [
  { hour: '11 AM', revenue: 320 },
  { hour: '12 PM', revenue: 580 },
  { hour: '1 PM', revenue: 420 },
  { hour: '2 PM', revenue: 280 },
  { hour: '3 PM', revenue: 150 },
  { hour: '4 PM', revenue: 220 },
  { hour: '5 PM', revenue: 480 },
  { hour: '6 PM', revenue: 720 },
  { hour: '7 PM', revenue: 890 },
  { hour: '8 PM', revenue: 680 },
  { hour: '9 PM', revenue: 520 },
  { hour: '10 PM', revenue: 268 },
];
