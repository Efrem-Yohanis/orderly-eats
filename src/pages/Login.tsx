import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/restaurant';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UtensilsCrossed, ChefHat, Monitor, BarChart3 } from 'lucide-react';

const roles: { role: UserRole; title: string; description: string; icon: typeof UtensilsCrossed; color: string }[] = [
  { role: 'waiter', title: 'Waiter', description: 'Take orders, manage tables, generate bills', icon: UtensilsCrossed, color: 'bg-blue-500' },
  { role: 'kitchen', title: 'Kitchen Display', description: 'View order queue, track preparation status', icon: Monitor, color: 'bg-amber-500' },
  { role: 'chef', title: 'Chef / Kitchen Manager', description: 'Manage orders, assign chefs, control menu', icon: ChefHat, color: 'bg-green-500' },
  { role: 'manager', title: 'Manager', description: 'Analytics, staff management, system settings', icon: BarChart3, color: 'bg-purple-500' },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRoleSelect = (role: UserRole) => {
    login(role);
    switch (role) {
      case 'waiter':
        navigate('/waiter');
        break;
      case 'kitchen':
        navigate('/kitchen');
        break;
      case 'chef':
        navigate('/chef');
        break;
      case 'manager':
        navigate('/manager');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">Restaurant Manager</h1>
          <p className="text-muted-foreground text-lg">Select your role to continue</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map(({ role, title, description, icon: Icon, color }) => (
            <Card
              key={role}
              className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-border/50 hover:border-primary/30 group"
              onClick={() => handleRoleSelect(role)}
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className={`${color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
