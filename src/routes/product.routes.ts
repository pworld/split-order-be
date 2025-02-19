import { Router } from 'express';
import { getProducts, setProduct, deleteProduct, updateProduct, countCharges } from '../controllers/product.controller';

const router = Router();

router.get('/products', getProducts);
router.post('/products', setProduct);
router.put('/products', updateProduct);
router.delete('/products/:id', deleteProduct);
router.post('/count-charges', countCharges);

export default router;
