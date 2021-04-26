const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/blockchain', function (req, res) {
    res.send(bitcoin);
});
app.post('/transaction', function (req, res) {
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    console.log(req.body);
    res.json({ note:'Transaction will be added in block ${blockIndex}'});
});
app.get('/mine', function(req, res) {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
	transactions: bitcoin.pendingTransactions,
	index: lastBlock['index'] + 1
    };
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
    const nodeAddress = uuidv4().split('-').join('');
    bitcoin.createNewTransaction(12.5, "00", nodeAddress);
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
    res.json({
	note: "New block mined successfully",
	block: newBlock
    });
});
app.listen(3000, function(){
    console.log('listening on port 3000 ..');
});
