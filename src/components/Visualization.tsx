import React from 'react';
import { Icon, Card } from 'antd';
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

const data = [
  { date: '01.01.2019', clicks: 400, impressions: 2400 },
  { date: '01.02.2019', clicks: 800, impressions: 2700 },
  { date: '01.03.2019', clicks: 600, impressions: 3400 }
];

export const Visualization: React.FC = () => {
  const formatXAxis = (label: string) => {
    return format(parse(label, 'dd.MM.yyyy', new Date(label)), 'd. MMM.'); // TODO: do we need to think about timezones?
  };

  return (
    <Card
      title={
        <>
          <Icon type='line-chart' style={{ marginRight: '10px' }} />
          Datasource "Doubleclick (dfa)" and "Meetrics; All Campaigns
        </>
      }
    >
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={data}>
          <Line
            name='Clicks'
            yAxisId='yAxisClicks'
            type='monotone'
            dataKey='clicks'
            stroke='#8884d8'
          />
          <Line
            name='Impressions'
            yAxisId='yAxisImpressions'
            type='monotone'
            dataKey='impressions'
            stroke='#82ca9d'
          />

          <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
          <XAxis dataKey='date' tickFormatter={formatXAxis} />
          <YAxis
            yAxisId='yAxisClicks'
            label={{ value: 'Clicks', angle: -90, position: 'insideLeft' }}
            orientation='left'
            dataKey='clicks'
          />
          <YAxis
            yAxisId='yAxisImpressions'
            label={{
              value: 'Impressions',
              angle: 90,
              position: 'insideRight'
            }}
            orientation='right'
            dataKey='impressions'
          />
          <Tooltip />
          <Legend verticalAlign='bottom' height={36} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
