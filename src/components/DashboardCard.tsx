
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-blue-600",
  trend,
  onClick
}) => {
  return (
    <Card className={`hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500">{subtitle}</p>
            )}
            {trend && (
              <div className={`flex items-center text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <span>{trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          <Icon className={`h-8 w-8 ${iconColor}`} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
