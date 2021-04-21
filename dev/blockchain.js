function Blockchain()
{
this.chain = [];
this.newTransactions = [];
}
//newBlock function
Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash)
{
const newBlock =
{
 //our newblock will have an index
        index: this.chain.length + 1,
        //timestamp property to account for time a block is created
        timestamp: Date.now(),
        //to put all transactions in our blockchain,never to change
        transactions: this.newTransactions,
        //nonce comes from proof of work
        nonce: nonce,
        //hash will be data for our new block compressed into single string
        hash: hash,
        //previousblockhash deals with hashing prev block's data
        previousBlockHash: previousBlockHash,
  };
};
