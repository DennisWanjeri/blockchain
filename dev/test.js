const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

const bc1 = {
    "chain": [
        {
            "index": 1,
            "timestamp": 1619851501409,
            "transactions": [],
            "nonce": 100,
            "hash": "0",
            "previousBlockHash": "0"
        },
        {
            "index": 2,
            "timestamp": 1619851575395,
            "transactions": [],
            "nonce": 18140,
            "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
            "previousBlockHash": "0"
        },
        {
            "index": 3,
            "timestamp": 1619851751906,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "7cce1b3c3e5b4c0c9fa04daeae1a19a3",
                    "transactionId": "f114a34089db4bc5a829d920bc8ad675"
                },
                {
                    "amount": 100,
                    "sender": "DVBJFHYTJJVVJJV",
                    "recipient": "Dfbcvhjcbvcbnv",
                    "transactionId": "2c1dfa4aecd9465f8067ef26407c2f88"
                },
                {
                    "amount": 200,
                    "sender": "DVBJFHYTJJVVJJV",
                    "recipient": "Dfbcvhjcbvcbnv",
                    "transactionId": "dc235144ced2472482002b22f60d74dc"
                },
                {
                    "amount": 202,
                    "sender": "DVBJFHYTJJVVJJV",
                    "recipient": "Dfbcvhjcbvcbnv",
                    "transactionId": "96ce65a5d8024a6188623cbb85aa6e64"
                },
                {
                    "amount": 2308,
                    "sender": "DVBJFHYTJJVVJJV",
                    "recipient": "Dfbcvhjcbvcbnv",
                    "transactionId": "f861afeb372443a390a10f483e6ba7dd"
                }
            ],
            "nonce": 41168,
            "hash": "00007d29e333919e136a1ee2eb438ff4471ad16247a217eae958696bcd0a434f",
            "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
        },
        {
            "index": 4,
            "timestamp": 1619851883068,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "c85a03bbc94744928804c26c05166a7f",
                    "transactionId": "ae84d2fc2a46473ab787698628a0100d"
                },
                {
                    "amount": 2308,
                    "sender": "DVBJFHYTJJVVJJV",
                    "recipient": "Dfbcvhjcbvcbnv",
                    "transactionId": "f5f47a3172404575876945f46d942101"
                },
                {
                    "amount": 2308,
                    "sender": "DVBJFHYTJJVVJJV",
                    "recipient": "Dfbcvhjcbvcbnv",
                    "transactionId": "af62ce4f995b4fae8cd5ebdd8c0b5b69"
                },
                {
                    "amount": 2308,
                    "sender": "DVBJFHYTJJVVJJV",
                    "recipient": "Dfbcvhjcbvcbnv",
                    "transactionId": "07e60a837eb34d3aa00faf37182570ea"
                },
                {
                    "amount": 2308,
                    "sender": "DVBJFHYTJJVVJJV",
                    "recipient": "Dfbcvhjcbvcbnv",
                    "transactionId": "69fe3fe5ba8f4543bc2ae6cec2cf5114"
                }
            ],
            "nonce": 84394,
            "hash": "0000e0e65fe421f065029f15950e473a97f3cf0c548bc134b95aaa30db7151a8",
            "previousBlockHash": "00007d29e333919e136a1ee2eb438ff4471ad16247a217eae958696bcd0a434f"
        },
        {
            "index": 5,
            "timestamp": 1619851992963,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "05b7b29a63bd482e8418bbffa4fe02d6",
                    "transactionId": "1feba5eb21074d93b5f58bd93227a316"
                }
            ],
            "nonce": 32193,
            "hash": "0000f9aea04cfd5a5fdad9d70f60755ebdef40e5986fce8eea26d40aa24960be",
            "previousBlockHash": "0000e0e65fe421f065029f15950e473a97f3cf0c548bc134b95aaa30db7151a8"
        },
        {
            "index": 6,
            "timestamp": 1619851997207,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "3fa02ac8d5394f1bab56cc122c2bae85",
                    "transactionId": "43311bfe46d240ac9afd0a96711e5912"
                }
            ],
            "nonce": 13981,
            "hash": "0000278688bd3096ff51091804e6e9ab2baab3ab891bbb1b703a3888eeee5eba",
            "previousBlockHash": "0000f9aea04cfd5a5fdad9d70f60755ebdef40e5986fce8eea26d40aa24960be"
        }
    ],
    "pendingTransactions": [
        {
            "amount": 12.5,
            "sender": "00",
            "recipient": "62d872d3c3404b0aa4d039fcb9f8ec56",
            "transactionId": "1445892ecb1f424ebf34ea688e3b6d3e"
        }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
};
console.log('VALID:', bitcoin.chainIsValid(bc1.chain));
