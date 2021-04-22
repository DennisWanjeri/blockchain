function Blockchain ()
{
this.chain = [];
this.pendingTransactions = [];
}
/**
*creates a newBlock
*/
Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash)
{
const newBlock =
{
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
this.newTransaction = [];
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
}
//push our NewTransaction object to our pendingTransaction array
this.pendingTransactions.push(newTransaction);
//returns a block object,no. of block our transaction was pushed to
return this.getLastBlock() ['index'] + 1;
}

module.exports = Blockchain;
