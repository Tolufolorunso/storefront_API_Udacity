import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../middleware/globalErrorHandler';
import { PRODUCT, Product } from '../../models/Products';
import { StatusCodes } from 'http-status-codes';

const productModel = new Product();

const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const name = req.body.name as unknown as string;
  const price = req.body.price as unknown as string;
  const category = req.body.category as unknown as string;

  if (!name || !price || !category) {
    next(new CustomError(400, `All fields required`));
  }

  try {
    const product = await productModel.Create({ name, price, category });
    res.status(StatusCodes.CREATED).json({
      status: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new Error('Something went wrong'));
    }
  }
};

const getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = req.query.category as unknown as string;
    let products: PRODUCT[];

    if (category) {
      products = await productModel.showCategory(category);
    } else {
      products = await productModel.index();
    }
    console.log(products);
    res.status(StatusCodes.OK).json({
      status: true,
      message: 'Products fetched successfully',
      result: products.length,
      products,
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new Error('Something went wrong'));
    }
  }
};

const getOneProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const productId = req.params.productId as unknown as number;
  if (!productId) {
    return next(new CustomError(400, `Product ${productId} required.`));
  }
  try {
    const product = await productModel.show(productId);

    if (!product) {
      return next(new CustomError(404, `Product not found. ${productId}`));
    }

    res.status(StatusCodes.OK).json({
      status: true,
      message: 'Product fetched successfully',
      product,
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new Error('Something went wrong'));
    }
  }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productId = req.params.productId as unknown as number;

    const isProductExist = await productModel.show(productId);

    if (!isProductExist) {
      return next(new CustomError(404, `Product not found. ${productId}`));
    }

    await productModel.delete(productId);
    res.status(StatusCodes.NO_CONTENT).json({
      status: true,
      message: 'No content',
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new Error('Something went wrong'));
    }
  }
};

export { createProduct, getAllProducts, getOneProduct, deleteProduct };
