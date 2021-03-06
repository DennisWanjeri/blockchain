const currentNodeUrl = process.argv[3];
const { v4: uuidv4 } = require('uuid');

function Blockchain ()
{
this.chain = [];
    this.pendingTransactions = [];
    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];
    this.createNewBlock(100, '0', '0');
}
/**
*creates a newBlock
*/
Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash)
{
const newBlock = {
 //our newblock will have an index
        index: this.chain.length + 1,
        //timestamp property to account for time a block is created
        timestamp: Date.now(),
        //to put all transactions in our blockchain,never to change
        transactions: this.pendingTransactions,
        //nonce comes from proof of work
        nonce: nonce,
        //hash will be data for our new block compressed into single string
        hash: hash,
        //previousblockhash deals with hashing prev block's data
        previousBlockHash: previousBlockHash,
  };
//pending transaction object,pending transactions aren't recorded un//til a new block is created
//empties the pending transactions array when a new block is created
this.pendingTransactions = [];
//push newBlock to chain and return it
this.chain.push(newBlock);
return newBlock;
};
/**
*getLastBlock - return the last block in our blockchain
*/
Blockchain.prototype.getLastBlock = function () {
//returning the chain at the last index
return this.chain[this.chain.length - 1];
}
/**
*createNewTransaction - creates a new transaction
*transaction means change of state
*Our Blockchain is a closed system
*An addition somewhere means a substraction somewhere
*address will be pseudonymous
*@amount:quantity of value to be transacted
*@sender:takes in sender's address
*@recipient:recipient address
*/
Blockchain.prototype.createNewTransaction = function (amount, sender,recipient) {
//create a new transaction object
const newTransaction = {
amount: amount,
sender: sender,
    recipient: recipient,
    transactionId: uuidv4().split('-').join('')
};
    return newTransaction;
};
Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj) {
	this.pendingTransactions.push(transactionObj);
	return this.getLastBlock() ['index'] + 1;
};
/**
*hashBlock - takes a block's data from our chain and hashes its data
*into a fixed length string
*@blockdata:input data from block to generate hash
*Description:implementing SHA256 hashing method,a secure way to do so
*/
Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
const sha256 = require('sha256');
const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
const hash = sha256(dataAsString);
return hash;
}
/**
*proofOfWork - secures the blockchain
*/
Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
var nonce = 0;
var hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
while (hash.substring(0, 4) !== '0000') {
nonce++;
hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
}
return nonce;
}

Blockchain.prototype.chainIsValid = function(blockchain) {
    let validChain = true;
    for (var i = 1; i < blockchain.length; i++) {

	const currentBlock = blockchain[i];
	const prevBlock = blockchain[i - 1];
	const blockHash = this.hashBlock(prevBlock['hash'], {transactions: currentBlock['transactions'], index: currentBlock['index']}, currentBlock['nonce']);
	if (blockHash.substring(0, 4) !== '0000')
	    validChain = false;
	if (currentBlock['previousBlockHash'] !== prevBlock['hash'])
	    validChain = false;
    };
    const genesisBlock = blockchain[0];
    const correctNonce = genesisBlock['nonce'] === 100;
    const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
    const correctHash = genesisBlock['hash'] === '0';
    const correctTransactions = genesisBlock['transactions'].length === 0;
    if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions)
	validChain = false;
    return validChain;
};
Blockchain.prototype.getBlock = function(blockHash) {
    let correctBlock = null;
    this.chain.forEach(block => {
	if (block.hash === blockHash)
	    correctBlock = block;
    });
    return correctBlock;
};
Blockchain.prototype.getTransaction = function(transactionId) {
    let correctTransaction = null;
    let correctBlock = null;
    this.chain.forEach(block => {
	block.transactions.forEach(transaction => {
	    if(transaction.transactionId === transactionId) {
		correctTransaction = transaction;
		correctBlock = block;
	    };
	});
    });
    return {
	transaction: correctTransaction,
	block:correctBlock
    };
};
Blockchain.prototype.getAddressData = function(address) {
    const addressTransactions = [];
    this.chain.forEach(block => {
	block.transactions.forEach(transaction => {
	    if (transaction.sender === address || transaction.recipient === address) {
		addressTransactions.push(transaction);
	    };
	});
    });
    let balance = 0;
    addressTransactions.forEach(transaction => {
	if (transaction.recipient === address)
	    balance += transaction.amount;
	else if (transaction.sender === address)
	    balance -= transaction.amount;
    });
    return {
	addressTransactions: addressTransactions,
	addressBalance: balance
    };
};
module.exports = Blockchain;
