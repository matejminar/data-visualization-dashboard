import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';

export const Header: React.FC = () => {
  const { Header } = Layout;
  const { Title } = Typography;

  return (
    <Header>
      <Row type='flex' style={{ height: '100%' }} align='middle'>
        <Col>
          <Title level={4} style={{ color: 'white', marginBottom: '0' }}>
            Adverity Advertising Data ETL-V Challenge
          </Title>
        </Col>
      </Row>
    </Header>
  );
};
