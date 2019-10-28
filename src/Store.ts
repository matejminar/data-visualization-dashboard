import { observable, computed, action, runInAction } from 'mobx';
import { LOADING_STATUSES, METRICS_URL } from './constants';
import Papa from 'papaparse';
import { map, uniq, uniqBy } from 'lodash-es';
import { createContext } from 'react';

interface Metric {
  Date: string;
  Datasource: string;
  Campaign: string;
  Clicks: string;
  Impressions: string;
}

class Store {
  @observable metrics: Metric[] = [];
  @observable loadingStatus = LOADING_STATUSES.Pending;
  @observable pickedDatasources: string[] = [];
  @observable pickedCampaigns: string[] = [];

  @action async fetchMetrics() {
    this.metrics = [];
    this.loadingStatus = LOADING_STATUSES.Pending;
    Papa.parse(METRICS_URL, {
      download: true,
      header: true,
      complete: ({ data }) => {
        runInAction(() => {
          this.loadingStatus = LOADING_STATUSES.Done;
          this.metrics = data;
        });
      },
      error: () => {
        runInAction(() => {
          this.loadingStatus = LOADING_STATUSES.Error;
        });
      }
    });
  }

  @action pickDatasources = (datasources: string[]) => {
    this.pickedDatasources = datasources;
  };

  @action pickCampaigns = (campaigns: string[]) => {
    this.pickedCampaigns = campaigns;
  };

  @computed
  get availableDatasources() {
    return uniq(map(this.metrics, 'Datasource')).filter(
      Datasource => Datasource
    );
  }

  @computed get availableCampaigns() {
    return uniq(map(this.metrics, 'Campaign')).filter(Campaign => Campaign);
  }

  @computed get filteredMetricsForChart() {
    const filteredMetrics = this.metrics.filter(metric => {
      const passCampaignFilter =
        this.pickedCampaigns.length === 0
          ? true
          : this.pickedCampaigns.includes(metric.Campaign);
      const passDatasourcesFilter =
        this.pickedDatasources.length === 0
          ? true
          : this.pickedDatasources.includes(metric.Datasource);

      return passCampaignFilter && passDatasourcesFilter;
    });

    // this data massaging can be surely done in more efficent way, need to study lodash docs more
    return uniqBy(filteredMetrics, 'Date')
      .filter(metric => metric.Date)
      .map(entry => {
        return filteredMetrics
          .filter(metric => entry.Date === metric.Date)
          .reduce(
            (current, next) => {
              return {
                Date: next.Date,
                Impressions:
                  Number(current.Impressions || 0) + Number(next.Impressions),
                Clicks: Number(current.Clicks || 0) + Number(next.Clicks)
              };
            },
            {} as any
          );
      });
  }
}

export default createContext(new Store());
