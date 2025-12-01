import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, DollarSign, Edit } from "lucide-react";
import { EditPriceDialog } from "./EditPriceDialog";

export type OrderStatus = "new" | "preparing" | "ready" | "delivered";

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

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
  onUpdatePrice: (orderId: string, newTotal: number) => void;
}

const statusConfig: Record<OrderStatus, { label: string; variant: "default" | "secondary" | "success" | "warning" }> = {
  new: { label: "New Order", variant: "warning" },
  preparing: { label: "Preparing", variant: "default" },
  ready: { label: "Ready", variant: "success" },
  delivered: { label: "Delivered", variant: "secondary" },
};

const statusFlow: Record<OrderStatus, OrderStatus | null> = {
  new: "preparing",
  preparing: "ready",
  ready: "delivered",
  delivered: null,
};

export const OrderCard = ({ order, onStatusChange, onUpdatePrice }: OrderCardProps) => {
  const [editPriceOpen, setEditPriceOpen] = useState(false);
  const currentStatus = statusConfig[order.status];
  const nextStatus = statusFlow[order.status];

  return (
    <>
      <Card className="transition-all duration-300 hover:shadow-lg border-border/50">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold text-foreground">{order.customerName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{order.time}</span>
            </div>
          </div>
          <Badge variant={currentStatus.variant} className="font-medium">
            {currentStatus.label}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-foreground">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-muted-foreground">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <DollarSign className="h-4 w-4" />
              <span>${order.total.toFixed(2)}</span>
              {order.status === "ready" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setEditPriceOpen(true)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
              )}
            </div>
            {nextStatus && (
              <Button
                onClick={() => {
                  if (nextStatus === "delivered") {
                    setEditPriceOpen(true);
                  } else {
                    onStatusChange(order.id, nextStatus);
                  }
                }}
                variant="default"
                size="sm"
                className="transition-all duration-300"
              >
                {nextStatus === "delivered" ? "Deliver & Update Price" : `Mark as ${statusConfig[nextStatus].label}`}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <EditPriceDialog
        open={editPriceOpen}
        onOpenChange={setEditPriceOpen}
        currentTotal={order.total}
        orderId={order.id}
        onUpdatePrice={(orderId, newTotal) => {
          onUpdatePrice(orderId, newTotal);
          if (order.status === "ready") {
            onStatusChange(orderId, "delivered");
          }
        }}
      />
    </>
  );
};
