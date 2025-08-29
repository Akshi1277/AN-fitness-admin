import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ChartCard({ title, children, className = "", headerClassName = "", contentClassName = "" }) {
  return (
    <Card className={className}>
      <CardHeader className={`pb-2 ${headerClassName}`}>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className={contentClassName}>
        {children}
      </CardContent>
    </Card>
  );
}
