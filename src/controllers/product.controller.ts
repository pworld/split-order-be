import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { ProductRepositoryImpl } from '../repositories/product.repository';
import { CourierChargeRepositoryImpl } from '../repositories/courier-charge.repository';

const productRepository = new ProductRepositoryImpl();
const CourierChargeRepository = new CourierChargeRepositoryImpl();
const productService = new ProductService(productRepository, CourierChargeRepository);

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
};

export const setProduct = async (req: Request, res: Response) => {
  const { item } = req.body;

  try {
    const product = await productService.setProduct(item);
    res.json(product);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
  
};

export const updateProduct = async (req: Request, res: Response) => {
  const { item } = req.body;

  try {
    const product = await productService.updateProduct(item);
    res.json(product);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
  
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const is_deleted = await productService.deleteProduct(id);
    res.json(is_deleted);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
  
};

export const countCharges = async (req: Request, res: Response) => {
  const { selected_items } = req.body;

  try {
    const calculate = await productService.countCharges(selected_items);
    res.json(calculate);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
}