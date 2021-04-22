const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();
bitcoin.createNewBlock(789789, '0AianajanIABAHANhn', '78FAGABbBNNznznz');
bitcoin.createNewTransaction(100, 'ALEXDL89363NW8ENIE', 'JENN5BG5FHNBVGB');
console.log(bitcoin);
