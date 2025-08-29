import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Minus } from "lucide-react";

export function KpiCard({ title, value, change, changeType = 'none', icon: Icon, description }) {
  const isPositive = changeType === 'increase';
  const isNegative = changeType === 'decrease';
  
  const ChangeIcon = isPositive ? ArrowUp : isNegative ? ArrowDown : Minus;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`text-xs ${isPositive ? 'text-green-600 dark:text-green-400' : isNegative ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'} flex items-center mt-1`}>
          <ChangeIcon className={`h-3 w-3 mr-1 ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-muted-foreground'}`} />
          {change}
          {description && <span className="text-muted-foreground ml-1">{description}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
