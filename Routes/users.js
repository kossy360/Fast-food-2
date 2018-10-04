import Router from 'express';
import category from '../controllers/categories';
import items from '../controllers/items';
import orders from '../controllers/orders';
import users from '../controllers/users';

const router = Router();
/* GET users listing. */

router.get('/category', category.get);

router.get('/items', items.get);

router.post('/new', users.createNew);

router.get('/profile/:userId', users.get);

router.get('/orders/:userId', orders.userGet);

router.post('/order/:userId', orders.createNew);

router.put('/profile/:userId', users.replace);

router.delete('/order/:orderId/:userId', orders.deleter);

module.exports = router;
