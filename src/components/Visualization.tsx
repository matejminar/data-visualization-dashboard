import React from 'react';
import { Icon, Card, Spin, Empty } from 'antd';
import { LOADING_STATUSES } from '../constants';
import { Chart } from './Chart';

interface VisualizationProps {
  chartData: object[];
  pickedCampaigns: string[];
  pickedDatasources: string[];
  loadingStatus: LOADING_STATUSES;
}

export const Visualization: React.FC<VisualizationProps> = ({
  chartData,
  pickedCampaigns,
  pickedDatasources,
  loadingStatus
}) => {
  const render = () => {
    if (loadingStatus === LOADING_STATUSES.Pending) {
      return (
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <Spin size='large' />
        </div>
      );
    }

    if (loadingStatus === LOADING_STATUSES.Error) {
      return <p>There has been an error.</p>;
    }

    if (chartData.length === 0) {
      return <Empty />;
    }

    return (
      <div>
        <p style={{ textAlign: 'center' }}>
          <strong>Datasources</strong> <br />
          {pickedDatasources.length === 0
            ? 'All'
            : pickedDatasources.join(', ')}
        </p>
        <p style={{ textAlign: 'center' }}>
          <strong>Campaign</strong> <br />
          {pickedCampaigns.length === 0 ? 'All' : pickedCampaigns.join(', ')}
        </p>
        <Chart chartData={chartData} />
      </div>
    );
  };

  return (
    <Card
      title={
        <>
          <Icon type='line-chart' style={{ marginRight: '10px' }} />
          Clicks and Impressions Chart
        </>
      }
      style={{ margin: '10px 0' }}
    >
      {render()}
    </Card>
  );
};
