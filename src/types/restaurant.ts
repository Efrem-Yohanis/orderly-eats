export type UserRole = 'waiter' | 'kitchen' | 'chef' | 'manager';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'appetizers' | 'main' | 'desserts' | 'drinks';
  cookingTime: number;
  tags: ('spicy' | 'vegan' | 'gluten-free')[];
  available: boolean;
  image?: string;
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
}

export interface Order {
  id: string;
  tableNumber: number;
  waiterId: string;
  waiterName: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'paid';
  priority: boolean;
  createdAt: Date;
  completedAt?: Date;
  total: number;
}

export interface Table {
  id: string;
  number: number;
  seats: number;
  status: 'vacant' | 'occupied' | 'needs-attention';
  currentOrderId?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: UserRole;
  status: 'active' | 'break' | 'off';
  ordersCompleted: number;
  avgTime: number;
  rating: number;
}

export interface DailyStats {
  revenue: number;
  ordersCompleted: number;
  avgPrepTime: number;
  peakHour: string;
  topItems: { name: string; count: number }[];
}
