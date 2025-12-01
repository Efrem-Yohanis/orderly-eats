import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface EditPriceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTotal: number;
  orderId: string;
  onUpdatePrice: (orderId: string, newTotal: number) => void;
}

export const EditPriceDialog = ({
  open,
  onOpenChange,
  currentTotal,
  orderId,
  onUpdatePrice,
}: EditPriceDialogProps) => {
  const [newTotal, setNewTotal] = useState(currentTotal.toString());

  const handleSubmit = () => {
    const price = parseFloat(newTotal);
    if (isNaN(price) || price < 0) {
      toast.error("Please enter a valid price");
      return;
    }

    onUpdatePrice(orderId, price);
    toast.success("Price updated successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Final Price</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="newTotal">Final Total ($)</Label>
            <Input
              id="newTotal"
              type="number"
              min="0"
              step="0.01"
              value={newTotal}
              onChange={(e) => setNewTotal(e.target.value)}
              placeholder="Enter final price"
            />
            <p className="text-sm text-muted-foreground">
              Current total: ${currentTotal.toFixed(2)}
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit}>
              Update Price
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
