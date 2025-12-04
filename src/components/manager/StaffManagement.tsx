import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockStaff } from '@/data/mockData';
import { Staff } from '@/types/restaurant';
import { User, Star, Clock, CheckCircle, Coffee, XCircle } from 'lucide-react';

const statusConfig = {
  active: { label: 'Active', variant: 'success' as const, icon: CheckCircle },
  break: { label: 'On Break', variant: 'warning' as const, icon: Coffee },
  off: { label: 'Off Duty', variant: 'secondary' as const, icon: XCircle },
};

const roleLabels = {
  waiter: 'Waiter',
  kitchen: 'Kitchen',
  chef: 'Chef',
  manager: 'Manager',
};

export function StaffManagement() {
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredStaff = filterRole === 'all' ? staff : staff.filter((s) => s.role === filterRole);

  const updateStatus = (id: string, newStatus: Staff['status']) => {
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Staff Overview</h2>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="waiter">Waiters</SelectItem>
            <SelectItem value="chef">Chefs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map((member) => {
          const StatusIcon = statusConfig[member.status].icon;
          return (
            <Card key={member.id} className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted p-2 rounded-full">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{member.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{roleLabels[member.role]}</p>
                    </div>
                  </div>
                  <Badge variant={statusConfig[member.status].variant} className="flex items-center gap-1">
                    <StatusIcon className="h-3 w-3" />
                    {statusConfig[member.status].label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {member.role !== 'kitchen' && (
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-muted/50 rounded-lg p-2">
                      <div className="flex items-center justify-center gap-1 text-foreground font-semibold">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {member.ordersCompleted}
                      </div>
                      <p className="text-xs text-muted-foreground">Orders</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <div className="flex items-center justify-center gap-1 text-foreground font-semibold">
                        <Clock className="h-4 w-4 text-blue-500" />
                        {member.avgTime}m
                      </div>
                      <p className="text-xs text-muted-foreground">Avg Time</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <div className="flex items-center justify-center gap-1 text-foreground font-semibold">
                        <Star className="h-4 w-4 text-amber-500" />
                        {member.rating}
                      </div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    variant={member.status === 'active' ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1"
                    onClick={() => updateStatus(member.id, 'active')}
                  >
                    Active
                  </Button>
                  <Button
                    variant={member.status === 'break' ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1"
                    onClick={() => updateStatus(member.id, 'break')}
                  >
                    Break
                  </Button>
                  <Button
                    variant={member.status === 'off' ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1"
                    onClick={() => updateStatus(member.id, 'off')}
                  >
                    Off
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
