import { NextFunction, Response } from 'express';
import { BadRequest, NotFound } from '../../middleware/globalErrorHandler';
import { PRODUCT, Product } from '../../models/Products';
import { StatusCodes } from 'http-status-codes';
import { RequestCustom } from '../../requestCustom';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const productModel = new Product();

const createProduct = async (req: RequestCustom, res: Response, next: NextFunction): Promise<void> => {
  const user = req.user;
  if (user?.role != 'admin') {
    return next(new BadRequest(`Not authorized to create product`));
  }
  const file: any = req.files?.file;
  const name = req.body.name as unknown as string;
  const price = req.body.price as unknown as string;
  const category = req.body.category as unknown as string;
  const description = req.body.description as unknown as string;
  const stock = req.body.stock as unknown as number;

  const fileId = `${uuidv4()}-${name}`;
  const filePath = path.join(__dirname, '../../../uploads/' + `${fileId}-${file?.name}`).toLowerCase();

  file.mv(filePath, (err: never) => {
    if (err) {
      return next(new BadRequest(`file failed to upload`));
    }
  });
  const imageUrl = `uploads/${fileId}-${file?.name}`.toLowerCase();
  console.log(imageUrl);
  const isAllFieldsAvaliable = [name, price, stock, description].every(Boolean);
  if (!isAllFieldsAvaliable) {
    return next(new BadRequest(`All fields required`));
  }

  try {
    const product = await productModel.create({ name, price, category, description, stock, imageUrl });

    res.status(StatusCodes.CREATED).json({
      status: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    if (error instanceof Error) {
      next(error);
    }
  }
};

const getAllProducts = async (req: RequestCustom, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = req.query.category as unknown as string;
    let products: PRODUCT[];

    if (category) {
      products = await productModel.showCategory(category);
    } else {
      products = await productModel.index();
    }
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

const getOneProduct = async (req: RequestCustom, res: Response, next: NextFunction): Promise<void> => {
  const productId = req.params.productId as unknown as number;
  if (!productId) {
    return next(new BadRequest(`Product ${productId} required.`));
  }
  try {
    const product = await productModel.show(productId);

    if (!product) {
      return next(new NotFound(`Product not found. ${productId}`));
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

const deleteProduct = async (req: RequestCustom, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productId = req.params.productId as unknown as number;

    const isProductExist = await productModel.show(productId);

    if (!isProductExist) {
      return next(new NotFound(`Product not found. ${productId}`));
    }

    await productModel.delete(productId);
    res.status(StatusCodes.NO_CONTENT).json({
      status: true,
      message: 'No content',
    });
  } catch (error) {
    next(error);
  }
};

export { createProduct, getAllProducts, getOneProduct, deleteProduct };
