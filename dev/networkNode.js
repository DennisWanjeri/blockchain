const port = process.argv[2];
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();
const { v4: uuidv4 } = require('uuid');
const rp = require('request-promise');
const Promise = require('promise');

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
app.post('/register-and-broadcast-node', function (req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1)
	bitcoin.networkNodes.push(newNodeUrl);
    const regNodesPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
	//...'/register-node'
	const requestOptions = {
	    uri: networkNodeUrl + '/register-node',
	    Method: 'POST',
	    body: {newNodeUrl: newNodeUrl},
	    json:true
	};
	regNodesPromises.push(rp(requestOptions));
    });
    Promise.all(regNodesPromises).then(data => {
	//using the data
	const bulkRegisterOptions = {
	    uri: newNodeUrl + '/register-nodes-bulk',
	    method: 'POST',
	    body: {allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]},
	    json:true
	};
	return rp(bulkRegisterOptions);
	Promise.all(bulkRegisterOptions).then(data => {
		res.json({note: 'New Node registered with network successfully' });
	    });
    });
});
app.post('/register-node', function (req, res) {
    //register a node with the network
    const newNodeUrl = req.body.newNodeUrl;
    if (bitcoin.networkNodes.lastIndexOf(newNodeUrl, 0) == -1)
	nodeNotAlreadyPresent = 1;
    const notCurrentNode = bitcoin.currentNodeUrl != newNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode)
	bitcoin.networkNodes.push(newNodeUrl);
    res.json({note: 'New node registered successfully.'});
});
app.post('/register-nodes-bulk', function (req, res) {
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl => {
	const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
	const notCurrentNode = bitcoin.currentNodeUrl != networkNodeUrl;
	if (nodeNotAlreadyPresent && notCurrentNode)
	    bitcoin.networkNodes.push(networkNodeUrl);
    });
    res.json({note: 'Bulk registration successful'});
});
app.listen(port, function() {
    console.log('listening on port ${port} ..');
});
