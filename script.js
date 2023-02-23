import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    stress: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 10 },
        { duration: '20s', target: 50 },
        { duration: '20s', target: 100 },
        { duration: '20s', target: 250 },
        { duration: '20s', target: 10 },
        { duration: '10s', target: 0 }, // scale down. Recovery stage.
      ],
    },
  },
};

export default function () {
  const BASE_URL = 'http://localhost:8080';
  const responses = http.batch([
    ['GET', `${BASE_URL}/products`, null, { timeout: '30s' }],
    ['GET', `${BASE_URL}/products/40396`, null, { timeout: '30s' }],
    ['GET', `${BASE_URL}/products/40396/styles`, null, { timeout: '30s' }],
    ['GET', `${BASE_URL}/products/40396/related`, null, { timeout: '30s' }],
  ]);
}
