import MockAdapter from 'axios-mock-adapter';
import api from './client';

export function setupMock() {
  // attach the mock adapter to the shared axios instance
  const mock = new MockAdapter(api, { delayResponse: 600 });

  // since api has baseURL '/api' in dev, mock the endpoint relative to instance
  mock.onGet('/chart').reply(200, {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    values: [120, 200, 150, 80, 70, 110, 130],
  });

  // also mock /escolas for demo so chart can use backend-shaped data
  mock.onGet('/escolas').reply(200, [
    { id: 1, nome: 'Escola A', servicosColeta: [{}, {}, {}] },
    { id: 2, nome: 'Escola B', servicosColeta: [{}] },
    { id: 3, nome: 'Escola C', servicosColeta: [{}, {}] },
  ]);

  return mock;
}
