import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    stress: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 1 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 100 },
        { duration: '10s', target: 1000 },
        { duration: '30s', target: 0 },
      ],
    },
  },
};

export default function stressTest() {
  const BASE_URL = 'http://localhost:3000';
  const randomProductID = Math.floor(Math.random() * 1000012);
  const randomPage = Math.floor(Math.random() * 10);
  const randomCount = Math.floor(Math.random() * 10);
  http.batch([
    ['GET', `${BASE_URL}/products?count=${randomCount}&page=${randomPage}`],
    ['GET', `${BASE_URL}/products/${randomProductID}`],
    ['GET', `${BASE_URL}/products/${randomProductID}/styles`],
    ['GET', `${BASE_URL}/products/${randomProductID}/related`],
  ]);
  sleep(2);
}
