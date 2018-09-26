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
router.get('/profile/:userId', (req, res, next) => {
  const x = get('user', req.params.userId, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send(x);
});
router.get('/orders/:userId', (req, res, next) => {
  const x = get('order', req.params.userId, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send(x);
});
router.post('/order/:userId', (req, res, next) => {
  const x = add('order', req.body, req.params.userId, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send();
});
router.put('/profile/:userId', (req, res, next) => {
  const x = replace('user', req.params.userId, req.body, (err) => {
    if (err) next(err);
  });
  if (x) res.status(200).send();
});
router.delete('/order/:orderId/:userId', (req, res, next) => {
  const x = deleter('order', req.params.orderId, req.params.userId, (err) => {
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
