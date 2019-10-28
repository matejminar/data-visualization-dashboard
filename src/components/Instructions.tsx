import React from 'react';
import { Icon, Card } from 'antd';

export const Instructions: React.FC = () => {
  return (
    <Card
      size='small'
      title={
        <>
          <Icon type='question-circle' style={{ marginRight: '10px' }} />
          Instructions
        </>
      }
      style={{ margin: '10px 0' }}
    >
      <ul>
        <li>
          Select zero to N <em>Datasources</em>
        </li>
        <li>
          Select zero to N <em>Campaigns</em> <br />
          <small>(where zero means "All")</small>
        </li>
      </ul>
      <p>
        Hitting "Apply", filters the chart to show a timeseries for both{' '}
        <em>Clicks</em> and <em>Impressions</em> for given <em>Datasources</em>{' '}
        and <em>Campaigns</em> - logical AND
      </p>
    </Card>
  );
};
