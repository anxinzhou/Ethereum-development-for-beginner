const Web3 = require('web3')
const Provider = require('@truffle/hdwallet-provider')

// This account is to send transactions. You can create another with web3js.
const private_key = '0xe27cb51d1eb94ad42b8f196e341e082042639677df43fd7d1440c07b40e2a065'
const user_address = '0x3c62Aa7913bc303ee4B9c07Df87B556B6770E3fC'

//Set the web3 provider to the blockchain created with Ganache.
//The private key here is used to sign transactions by default.
const provider = new Provider({
	privateKeys: [private_key], 
	providerOrUrl: 'http://127.0.0.1:7545'
})
const web3 = new Web3(provider)

// Initialize the smart contract object, requiring
// 1. The json interface to call the smart contract functions
// 2. The address of the smart contract on the blockchain
const JSONInterface = require('./build/contracts/Storage.json')['abi']
const contract_address = '0x3ff10E0207bc000184aA2b0F9BC098fA2e9A70d6'
const contract = new web3.eth.Contract(JSONInterface, contract_address)

// This functions calls the store function in the smart contract. It needs a transaction.
async function store_num(num) {
	let receipt= await contract.methods.store(num).send({
		from: user_address,
		gas: 1000000,
		gasPrice: 0,
	})
	if (receipt.status !== true) {
		console.log("transaction fails")
	} 
}

// This function calls the retrieve function in the smart contract. It needs no transaction.
async function retrieve_num() {
	let num = await contract.methods.retrieve().call()
	return num
}

// Test our smart contract
async function test() {
	console.log("old num:", await retrieve_num())
	await store_num(Date.now());
	console.log("new num:", await retrieve_num())
}

test()