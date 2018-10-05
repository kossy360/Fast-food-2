import Router from 'express';
import category from '../controllers/categories';
import items from '../controllers/items';
import orders from '../controllers/orders';

const router = Router();

router.get('/category', category.get);

router.get('/items', items.get);

router.get('/orders', orders.get);

router.post('/category/:name', category.createNew);

router.post('/items', items.createNew);

router.put('/category/:old/:new', category.replace);

router.put('/items/:itemId', items.replace);

router.put('/orders/:orderId', orders.replace);

router.delete('/category/:name', category.deleter);

router.delete('/items/:itemId', items.deleter);

module.exports = router;
