import { useState } from "react";
import { OrderCard, OrderStatus } from "@/components/OrderCard";
import { StatCard } from "@/components/StatCard";
import { AddOrderDialog } from "@/components/AddOrderDialog";
import { ShoppingBag, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  time: string;
}

// Mock data - replace with real data later
const initialOrders: Order[] = [
  {
    id: "1",
    customerName: "Sarah Johnson",
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 12.99 },
      { name: "Caesar Salad", quantity: 1, price: 8.99 },
    ],
    total: 34.97,
    status: "new" as OrderStatus,
    time: "2 mins ago",
  },
  {
    id: "2",
    customerName: "Mike Chen",
    items: [
      { name: "Cheeseburger", quantity: 1, price: 11.99 },
      { name: "French Fries", quantity: 2, price: 4.99 },
      { name: "Cola", quantity: 1, price: 2.99 },
    ],
    total: 24.96,
    status: "preparing" as OrderStatus,
    time: "5 mins ago",
  },
  {
    id: "3",
    customerName: "Emma Wilson",
    items: [
      { name: "Pad Thai", quantity: 1, price: 13.99 },
      { name: "Spring Rolls", quantity: 1, price: 6.99 },
    ],
    total: 20.98,
    status: "ready" as OrderStatus,
    time: "8 mins ago",
  },
  {
    id: "4",
    customerName: "James Brown",
    items: [
      { name: "Sushi Platter", quantity: 1, price: 24.99 },
      { name: "Miso Soup", quantity: 2, price: 3.99 },
    ],
    total: 32.97,
    status: "delivered" as OrderStatus,
    time: "15 mins ago",
  },
];

const Index = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
  };

  const handleUpdatePrice = (orderId: string, newTotal: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, total: newTotal } : order))
    );
  };

  const handleAddOrder = (customerName: string, items: OrderItem[]) => {
    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const newOrder: Order = {
      id: Date.now().toString(),
      customerName,
      items,
      total,
      status: "new",
      time: "Just now",
    };
    setOrders([newOrder, ...orders]);
  };

  const filterOrdersByStatus = (status: OrderStatus) => orders.filter((order) => order.status === status);

  const stats = {
    totalOrders: orders.length,
    activeOrders: orders.filter((o) => o.status !== "delivered").length,
    completedToday: orders.filter((o) => o.status === "delivered").length,
    revenue: orders.reduce((sum, order) => sum + order.total, 0),
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Kitchen Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Manage your orders in real-time</p>
          </div>
          <AddOrderDialog onAddOrder={handleAddOrder} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={ShoppingBag}
            trend="+12% from yesterday"
            className="transition-all duration-300 hover:shadow-md"
          />
          <StatCard
            title="Active Orders"
            value={stats.activeOrders}
            icon={Clock}
            className="transition-all duration-300 hover:shadow-md"
          />
          <StatCard
            title="Delivered Today"
            value={stats.completedToday}
            icon={CheckCircle2}
            className="transition-all duration-300 hover:shadow-md"
          />
          <StatCard
            title="Revenue"
            value={`$${stats.revenue.toFixed(2)}`}
            icon={DollarSign}
            trend="+8% from yesterday"
            className="transition-all duration-300 hover:shadow-md"
          />
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="preparing">Preparing</TabsTrigger>
            <TabsTrigger value="ready">Ready</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  onUpdatePrice={handleUpdatePrice}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterOrdersByStatus("new").map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  onUpdatePrice={handleUpdatePrice}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preparing" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterOrdersByStatus("preparing").map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  onUpdatePrice={handleUpdatePrice}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ready" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterOrdersByStatus("ready").map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  onUpdatePrice={handleUpdatePrice}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterOrdersByStatus("delivered").map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  onUpdatePrice={handleUpdatePrice}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
