
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SessionChartProps {
  data: any[];
  type: 'line' | 'bar';
  title: string;
  dataKeys: { key: string; color: string; name: string }[];
  height?: number;
}

const SessionChart: React.FC<SessionChartProps> = ({
  data,
  type,
  title,
  dataKeys,
  height = 300
}) => {
  const Chart = type === 'line' ? LineChart : BarChart;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <Chart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={data[0] ? Object.keys(data[0])[0] : 'x'}
              fontSize={12}
            />
            <YAxis fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            {dataKeys.map((item) => (
              type === 'line' ? (
                <Line
                  key={item.key}
                  type="monotone"
                  dataKey={item.key}
                  stroke={item.color}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name={item.name}
                />
              ) : (
                <Bar
                  key={item.key}
                  dataKey={item.key}
                  fill={item.color}
                  name={item.name}
                />
              )
            ))}
          </Chart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SessionChart;
