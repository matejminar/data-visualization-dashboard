import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { format, parse } from 'date-fns';
import numeral from 'numeral';

interface ChartProps {
  chartData: object[];
}

export const Chart: React.FC<ChartProps> = ({ chartData }) => {
  const formatXAxis = (label: string) => {
    return format(parse(label, 'dd.MM.yyyy', new Date()), 'd. MMM.'); // TODO: do we need to think about timezones?
  };

  const formatYAxis = (label: string) => {
    return numeral(label).format('0.0a');
  };

  return (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart data={chartData}>
        <Line
          name='Clicks'
          yAxisId='yAxisClicks'
          type='monotone'
          dataKey='Clicks'
          stroke='#8884d8'
          dot={false}
        />
        <Line
          name='Impressions'
          yAxisId='yAxisImpressions'
          type='monotone'
          dataKey='Impressions'
          stroke='#82ca9d'
          dot={false}
        />

        <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
        <XAxis dataKey='Date' tickFormatter={formatXAxis} />
        <YAxis
          dataKey='Clicks'
          yAxisId='yAxisClicks'
          label={{ value: 'Clicks', angle: -90, position: 'insideLeft' }}
          orientation='left'
          tickFormatter={formatYAxis}
        />
        <YAxis
          dataKey='Impressions'
          yAxisId='yAxisImpressions'
          label={{
            value: 'Impressions',
            angle: 90,
            position: 'insideRight'
          }}
          orientation='right'
          tickFormatter={formatYAxis}
        />
        <Tooltip />
        <Legend verticalAlign='bottom' height={36} />
      </LineChart>
    </ResponsiveContainer>
  );
};
