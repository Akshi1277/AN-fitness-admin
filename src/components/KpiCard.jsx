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
  trend = null,
  color = 'from-primary/10 to-primary/5'
}) {
  const isPositive = changeType === 'increase';
  const isNegative = changeType === 'decrease';
  
  const ChangeIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
  
  return (
    <Card className={cn(
      "relative overflow-hidden shadow-professional hover:shadow-professional-xl transition-all duration-500 group border-border/30 hover-lift card-professional",
      className
    )}>
      {/* Enhanced background gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-all duration-500",
        color
      )} />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
        <div className="space-y-2">
          <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
            {title}
          </CardTitle>
        </div>
        {Icon && (
          <div className={cn(
            "p-3 rounded-2xl transition-all duration-300 shadow-professional group-hover:shadow-professional-lg group-hover:scale-110",
            "bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10"
          )}>
            <Icon className="h-6 w-6 text-primary group-hover:text-primary transition-colors duration-300" />
          </div>
        )}
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-4">
        <div className="space-y-4">
          <div className="text-4xl font-bold tracking-tight group-hover:text-primary transition-all duration-300 font-mono">
            {value}
          </div>
          
          {change && (
            <div className={cn(
              "flex items-center text-sm font-semibold transition-all duration-300",
              isPositive ? 'text-green-600 dark:text-green-400' : 
              isNegative ? 'text-red-600 dark:text-red-400' : 
              'text-muted-foreground'
            )}>
              <div className={cn(
                "flex items-center justify-center w-7 h-7 rounded-xl mr-3 transition-all duration-300 shadow-sm",
                isPositive ? 'bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-900/50' :
                isNegative ? 'bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-900/50' :
                'bg-muted group-hover:bg-muted/80'
              )}>
                <ChangeIcon className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold">{change}</span>
                {description && (
                  <span className="text-xs text-muted-foreground font-medium mt-0.5">
                    {description}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {trend && (
            <div className="pt-3">
              <div className="h-12 flex items-end space-x-1 rounded-lg overflow-hidden bg-muted/20 p-2">
                {trend.map((point, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-gradient-to-t from-primary/60 to-primary/30 rounded-sm group-hover:from-primary/80 group-hover:to-primary/50 transition-all duration-300 min-h-[4px]"
                    style={{ 
                      height: `${Math.max((point / Math.max(...trend)) * 100, 8)}%`,
                      animationDelay: `${index * 50}ms`
                    }}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">7-day trend</p>
            </div>
          )}
        </div>
      </CardContent>
      
      {/* Subtle border highlight */}
      <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/20 transition-all duration-500 pointer-events-none" />
    </Card>
  );
}