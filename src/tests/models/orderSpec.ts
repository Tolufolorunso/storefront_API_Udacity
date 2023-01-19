import Order from '../../models/Order';
import { PRODUCT, Product } from '../../models/Products';
import { User, AUTH } from '../../models/User';

const productModel = new Product();

let productId: number;

const userModel = new User();

const orderModel = new Order();

let userId: number;
let orderID: number;

const user_test: AUTH = {
  username: 'efsccds',
  firstname: 'kola',
  lastname: 'kola',
  password: 'test',
};

const product: PRODUCT = {
  name: 'shoe',
  price: '100',
  category: 'Test Product Description',
};

describe('OrderModel', () => {
  it('should have create order method', () => {
    expect(orderModel.create).toBeDefined();
  });

  it('should have index method', () => {
    expect(orderModel.index).toBeDefined();
  });

  it('should have getOneOrder method', () => {
    expect(orderModel.show).toBeDefined();
  });

  it('should have delete order method', () => {
    expect(orderModel.delete).toBeDefined();
  });
});

describe('OrderModel Functionalities', () => {
  beforeAll(async () => {
    const newUser = await userModel.register(user_test);
    userId = newUser.id as unknown as number;
  });

  it('should create new order', async () => {
    const newProduct = await productModel.create(product);
    productId = newProduct.id as unknown as number;
    const newOrder = await orderModel.create({
      userId: userId,
      status: false,
      products: [
        {
          productId: productId,
          quantity: 2,
        },
      ],
    });
    orderID = newOrder.id as unknown as number;
    expect(newOrder).toBeTruthy();
  });

  it('should get all orders', async () => {
    const orders = await orderModel.index();
    expect(orders.length).toBeGreaterThanOrEqual(1);
  });

  it('should get current order', async () => {
    const order = await orderModel.show(orderID);
    expect(order.id).toEqual(orderID);
  });

  it('should delete order', async () => {
    const deleteOrder = await orderModel.delete(orderID);
    expect(deleteOrder).toBeUndefined();
  });

  afterAll(async () => {
    await userModel.deleteUser(userId);
    await productModel.delete(productId);
  });
});
