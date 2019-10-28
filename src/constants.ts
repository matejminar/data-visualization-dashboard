export enum LOADING_STATUSES {
  Pending,
  Done,
  Error
}

export const METRICS_URL = '/data.csv'; // original S3 url does not have SSL certificate and therefore throws the mixed content error
