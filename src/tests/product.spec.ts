import supertest from 'supertest';
import app from '../server';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('All about products', (): void => {
  it('should return status code 200 for create, endpoint: "/api/products"', async (): Promise<void> => {
    const response: supertest.Response = await request
      .post('/api/products')
      .send({ name: 'hello', price: '30', category: 'home' });
    const { status } = response.body;
    expect(status).toBe(true);
    // expect(product).toBe('object');
  });
});

afterAll(async (): Promise<void> => {
  console.log('hello');
});
