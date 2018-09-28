import createError from 'http-errors';
import Router from 'express';
import {
  storage, add, deleter, replace,
} from './storage';

const router = Router();

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
router.get('/orders', (req, res, next) => {
  const x = storage.orders;
  if (x) res.json(x);
  else next(createError(404, 'not found'));
});
router.post('/category/:name', (req, res, next) => {
  const x = add('category', req.params.name, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send();
});
router.post('/items', (req, res, next) => {
  const x = add('items', req.body, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send();
});
router.put('/category/:old/:new', (req, res, next) => {
  const x = replace('category', req.params.old, req.params.new, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send();
});
router.put('/items/:itemId', (req, res, next) => {
  const x = replace('items', req.params.itemId, req.body, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send();
});
router.put('/orders/:orderId', (req, res, next) => {
  const x = replace('order', req.params.orderId, req.body, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send();
});
router.delete('/category/:name', (req, res, next) => {
  const x = deleter('category', req.params.name, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send();
});
router.delete('/items/:itemId', (req, res, next) => {
  const x = deleter('items', req.params.itemId, 0, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send();
});

module.exports = router;
