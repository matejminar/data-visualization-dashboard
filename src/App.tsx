import React, { useContext, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import { observer } from 'mobx-react-lite';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Instructions } from './components/Instructions';
import { Filters } from './components/Filters';
import { Visualization } from './components/Visualization';
import Store from './Store';
import 'antd/dist/antd.css';

const App = observer(() => {
  const store = useContext(Store);
  const { Content } = Layout;

  useEffect(() => {
    store.fetchMetrics();
  }, [store]);

  return (
    <Layout>
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <Instructions />
        <Row type='flex' justify='space-between'>
          <Col lg={8} xs={24}>
            <Filters
              availableCampaigns={store.availableCampaigns}
              availableDatasources={store.availableDatasources}
              pickCampaigns={store.pickCampaigns}
              pickDatasources={store.pickDatasources}
              pickedCampaigns={store.pickedCampaigns}
              pickedDatasources={store.pickedDatasources}
            />
          </Col>
          <Col lg={15} xs={24}>
            <Visualization
              chartData={store.filteredMetricsForChart}
              pickedCampaigns={store.pickedCampaigns}
              pickedDatasources={store.pickedDatasources}
              loadingStatus={store.loadingStatus}
            />
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
});

export default App;
