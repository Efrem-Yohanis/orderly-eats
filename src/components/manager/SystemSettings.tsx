import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockMenuItems } from '@/data/mockData';
import { MenuItem } from '@/types/restaurant';
import { Bell, Volume2, DollarSign, Clock, Utensils, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SystemSettings() {
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [settings, setSettings] = useState({
    soundAlerts: true,
    pushNotifications: true,
    autoRefresh: true,
    taxRate: 8.5,
    serviceCharge: 10,
  });

  const toggleAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, available: !item.available } : item))
    );
    toast({
      title: 'Menu Updated',
      description: 'Item availability has been changed.',
    });
  };

  const handleSettingChange = (key: keyof typeof settings, value: boolean | number) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    toast({
      title: 'Settings Saved',
      description: `${key} has been updated.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>Configure alert preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="sound">Sound Alerts</Label>
              </div>
              <Switch
                id="sound"
                checked={settings.soundAlerts}
                onCheckedChange={(v) => handleSettingChange('soundAlerts', v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="push">Push Notifications</Label>
              </div>
              <Switch
                id="push"
                checked={settings.pushNotifications}
                onCheckedChange={(v) => handleSettingChange('pushNotifications', v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="refresh">Auto Refresh (30s)</Label>
              </div>
              <Switch
                id="refresh"
                checked={settings.autoRefresh}
                onCheckedChange={(v) => handleSettingChange('autoRefresh', v)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Billing Settings
            </CardTitle>
            <CardDescription>Configure tax and service charges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tax">Tax Rate (%)</Label>
              <Input
                id="tax"
                type="number"
                value={settings.taxRate}
                onChange={(e) => handleSettingChange('taxRate', parseFloat(e.target.value) || 0)}
                className="max-w-[120px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Service Charge (%)</Label>
              <Input
                id="service"
                type="number"
                value={settings.serviceCharge}
                onChange={(e) => handleSettingChange('serviceCharge', parseFloat(e.target.value) || 0)}
                className="max-w-[120px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Utensils className="h-5 w-5 text-amber-500" />
            Menu Management
          </CardTitle>
          <CardDescription>Toggle item availability (86'd items)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  item.available ? 'border-border bg-card' : 'border-destructive/30 bg-destructive/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-foreground">{item.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    ${item.price}
                  </Badge>
                </div>
                <Button
                  variant={item.available ? 'outline' : 'destructive'}
                  size="sm"
                  onClick={() => toggleAvailability(item.id)}
                  className="h-7 w-7 p-0"
                >
                  {item.available ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
