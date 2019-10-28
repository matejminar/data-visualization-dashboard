import React from 'react';
import { Icon, Card } from 'antd';

export const Filters: React.FC = () => {
  return (
    <Card
      title={
        <>
          <Icon type='sliders' style={{ marginRight: '10px' }} />
          Filter dimension values
        </>
      }
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};
