import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function KpiCard({ 
  title, 
  value, 
  change, 
  changeType = 'none', 
  icon: Icon, 
  description,
  className = "",
  trend = null
}) {
  const isPositive = changeType === 'increase';
  const isNegative = changeType === 'decrease';
  
  const ChangeIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
  
  return (
    <Card className={cn(
      "relative overflow-hidden shadow-professional hover:shadow-professional-lg transition-all duration-300 group border-border/50",
      className
    )}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
        <div className="space-y-1">
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </CardTitle>
        </div>
        {Icon && (
          <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-3">
          <div className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors duration-200">
            {value}
          </div>
          
          {change && (
            <div className={cn(
              "flex items-center text-sm font-medium",
              isPositive ? 'text-green-600 dark:text-green-400' : 
              isNegative ? 'text-red-600 dark:text-red-400' : 
              'text-muted-foreground'
            )}>
              <div className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full mr-2",
                isPositive ? 'bg-green-100 dark:bg-green-900/30' :
                isNegative ? 'bg-red-100 dark:bg-red-900/30' :
                'bg-muted'
              )}>
                <ChangeIcon className="h-3 w-3" />
              </div>
              <span>{change}</span>
              {description && (
                <span className="text-muted-foreground ml-1">
                  {description}
                </span>
              )}
            </div>
          )}
          
          {trend && (
            <div className="pt-2">
              <div className="h-8 flex items-end space-x-1">
                {trend.map((point, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-primary/20 rounded-sm group-hover:bg-primary/30 transition-colors duration-200"
                    style={{ height: `${(point / Math.max(...trend)) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}