import createError from 'http-errors';
import Router from 'express';
import {
  storage, add, get, deleter, replace,
} from './storage';

const router = Router();
/* GET users listing. */

router.get('/category', (req, res, next) => {
  const x = storage.category;
  if (x) res.json(x);
  else next(createError(404, 'not found'));
});
router.get('/items', (req, res, next) => {
  const x = storage.items;
  if (x) res.json(x);
  else next(createError(404, 'not found'));
});
router.post('/new', (req, res, next) => {
  const x = add('user', req.body, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send();
});
router.get('/:userId/profile', (req, res, next) => {
  const x = get('user', req.params.userId, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send(x);
});
router.get('/:userId/orders', (req, res, next) => {
  const x = get('user', req.params.userId, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send(x);
});
router.post('/order', (req, res, next) => {
  const x = add('order', req.body, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send();
});
router.put('/:orderId/order', (req, res, next) => {
  const x = replace('order', req.params.orderId, req.body, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send();
});
router.put('/:userId/profile', (req, res, next) => {
  const x = replace('user', req.params.userId, req.body, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send();
});
router.delete('/order/:orderId', (req, res, next) => {
  const x = deleter('order', req.params.orderId, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send();
});
router.delete('/:userId/profile', (req, res, next) => {
  const x = deleter('user', req.params.userId, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send();
});

module.exports = router;
