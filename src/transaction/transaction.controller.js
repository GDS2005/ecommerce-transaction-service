const Transaction = require('../transaction/transaction.model');
const transactionValidation = require('../transaction/transaction.validation');

exports.createTransaction = async (req, res) => {
    try {
        const { error, value } = transactionValidation.createTransaction.body.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { seller, buyer, product, status, quantity } = value;

        // Check if transaction already exists for the buyer
        //let transaction = await Transaction.findOne({ buyer });
        //if (transaction) return res.status(400).json({ msg: 'Transaction already exists for this buyer' });

        transaction = new Transaction({ seller, buyer, product, status, quantity });

        await transaction.save();

        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const results = await Transaction.find();
        res.json({ results });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getTransaction = async (req, res) => {
    try {
        const results = await Transaction.findById(req.params.id);
        if (!results) return res.status(404).json({ msg: 'Transaction not found' });
        res.json({ results });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateTransaction = async (req, res) => {
    const { id } = req.params;

    try {
        const { error, value } = transactionValidation.updateTransaction.body.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { seller, buyer, product, status } = value;

        let transaction = await Transaction.findById(id);
        if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });

        if (seller) transaction.seller = seller;
        if (buyer) transaction.buyer = buyer;
        if (product) transaction.product = product;
        if (typeof status !== 'undefined') transaction.status = status;

        await transaction.save();
        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });

        await Transaction.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Transaction removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};