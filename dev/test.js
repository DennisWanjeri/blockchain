const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();
bitcoin.createNewBlock(789789, '0AianajanIABAHANhn', '78FAGABbBNNznznz');
bitcoin.createNewTransaction(100, 'ALEXDL89363NW8ENIE', 'JENN5BG5FHNBVGB');
bitcoin.createNewBlock(565555,'AD5FGGGVBVGBBBBBB', 'DDECFVHHHH56VVBBH');
bitcoin.createNewTransaction(500, 'ALEXDL89363NW8ENIE', 'JENN5BG5FHNBVGB');
bitcoin.createNewTransaction(300, 'ALEXDL89363NW8ENIE', 'JENN5BG5FHNBVGB');
bitcoin.createNewTransaction(200, 'ALEXDL89363NW8ENIE', 'JENN5BG5FHNBVGB');
bitcoin.createNewBlock(7897896, '0AianhajanIABAHANhn', '78FAGjABbB//NNznznz');
console.log(bitcoin.chain[2]);
