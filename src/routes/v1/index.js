const express = require('express');
const router = express.Router();
const transactionController = require('../../transaction/transaction.controller');

router
  .route('/')
  .post(transactionController.createTransaction)
  .get(transactionController.getTransactions);

router
  .route('/:id')
  .get(transactionController.getTransaction)
  .patch(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

module.exports = router;