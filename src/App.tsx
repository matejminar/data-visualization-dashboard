import React from 'react';
import { Layout, Row, Col } from 'antd';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Instructions } from './components/Instructions';
import { Filters } from './components/Filters';
import { Visualization } from './components/Visualization';

const App: React.FC = () => {
  const { Content } = Layout;

  return (
    <Layout>
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <Instructions />
        <Row type='flex' justify='space-between'>
          <Col lg={8} xs={24}>
            <Filters />
          </Col>
          <Col lg={15} xs={24}>
            <Visualization />
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
};

export default App;
