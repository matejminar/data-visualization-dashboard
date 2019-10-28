import React, { useEffect, useState } from 'react';
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
import Papa from 'papaparse';
import { uniqBy } from 'lodash-es';
import numeral from 'numeral';

interface Statistic {
  Date: string;
  Datasource: string;
  Campaign: string;
  Clicks: number;
  Impressions: number;
}

export const Visualization: React.FC = () => {
  const [data, setData] = useState<Statistic[]>([]);

  useEffect(() => {
    Papa.parse('/data.csv', {
      download: true,
      header: true,
      complete: ({ data }) => {
        const result: Statistic[] = uniqBy(data, 'Date')
          .filter(statistic => statistic.Date)
          .map(statistic => {
            return data
              .filter(entry => entry.Date === statistic.Date)
              .reduce((current, next) => {
                return {
                  Date: next.Date,
                  Impressions:
                    Number(current.Impressions || 0) + Number(next.Impressions),
                  Clicks: Number(current.Clicks || 0) + Number(next.Clicks)
                };
              }, {});
          });
        setData(result);
      }
    });
  }, []);

  const formatXAxis = (label: string) => {
    return format(parse(label, 'dd.MM.yyyy', new Date()), 'd. MMM.'); // TODO: do we need to think about timezones?
  };

  const formatYAxis = (label: string) => {
    return numeral(label).format('0.0a');
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
      <ResponsiveContainer width='100%' height={600}>
        <LineChart data={data}>
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
    </Card>
  );
};
