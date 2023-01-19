import { PRODUCT, Product } from '../../models/Products';

const productModel = new Product();

let productId: number;

describe('Product Model', () => {
  it('should have create Product model', async () => {
    expect(productModel.create).toBeDefined();
  });

  it('should have index model', async () => {
    expect(productModel.index).toBeDefined();
  });

  it('should have show model', async () => {
    expect(productModel.show).toBeDefined();
  });

  it('should have show category model', async () => {
    expect(productModel.showCategory).toBeDefined();
  });

  it('should have delete Product model', async () => {
    expect(productModel.delete).toBeDefined();
  });
});

describe('Product Model functionalities', () => {
  const product: PRODUCT = {
    name: 'shoe',
    price: '100',
    category: 'Test category',
  };
  it('should create a new Product', async () => {
    const newProduct = await productModel.create(product);
    expect(newProduct.name).toBe(product.name);
    productId = newProduct.id as unknown as number;
  });

  it('should get one Product', async () => {
    const products = await productModel.show(productId);
    expect(products.id).toBe(productId);
  });

  it('should list all Products', async () => {
    const products = await productModel.index();
    expect(products.length).toBeGreaterThanOrEqual(1);
  });

  it('should list Products by category', async () => {
    const products = await productModel.showCategory(product.category);
    const cat = products[0];
    expect(cat.category).toBe(product.category);
    expect(products.length).toBeGreaterThanOrEqual(1);
  });

  it('should delete Product', async () => {
    const product = await productModel.delete(productId);
    expect(product).toBeUndefined();
  });
});
