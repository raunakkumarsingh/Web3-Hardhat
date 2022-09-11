// const { Contract } = require("ethers");
const { ethers, run ,network} = require("hardhat");



async function main(){
  // console.log(ethers)
const SimpleStorageFactory =await ethers.getContractFactory("SimpleStorage")
console.log("Deploy Contract....")
const SimpleStorage=await SimpleStorageFactory.deploy()
await SimpleStorage.deployed()

console.log(`Deployed Contract to: ${SimpleStorage.address}`)
if(network.config.chainId===5 && process.env.ETHERSCAN_API_KEY) {
  console.log("waiting for block confirmation")
  await SimpleStorage.deployTransaction.wait(6)
  await verify(SimpleStorage.address,[]);

}
const currentValue=await SimpleStorage.retrieve();
console.log(`current Value is: ${currentValue}`)

const transactionResponse=await SimpleStorage.store(7);
await transactionResponse.wait(1);

const updatevalue=await SimpleStorage.retrieve();
console.log(`updated value is: ${updatevalue}`)


// console.log(network.config)

}

async function verify(contractAddress,args){
  console.log("verifing contract");
   try{await run("verify:verify",{
    address: contractAddress,
    constructorArguments:args,
   })}
   catch(e){
    if(e.message.toLowerCase().includes("already verified")){
      console.log("already verified")
      console.log(e)
    }
     else{
      console.log(e)
     }
   }

}


main().then(()=>process.exit(0)).catch((error)=>{
  console.error(error);
  process.exit(1);
})