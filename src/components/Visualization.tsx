import React from 'react';
import { Icon, Card } from 'antd';

export const Visualization: React.FC = () => {
  return (
    <Card
      title={
        <>
          <Icon type='line-chart' style={{ marginRight: '10px' }} />
          Datasource "Doubleclick (dfa)" and "Meetrics; All Campaigns
        </>
      }
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};
