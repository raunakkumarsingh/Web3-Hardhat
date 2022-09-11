
import {ethers} from "./ethers-5.6.esm.min.js"
import {abi,contractAddress} from "./constants.js"

const connectButton=document.getElementById("connectButton")
const fundButton=document.getElementById("fundButton")
const balance = document.getElementById("getBalanceButton")
const withdrawButton=document.getElementById("withdrawButton")
connectButton.onclick=connect
fundButton.onclick=fund
balance.onclick=getbalance
withdrawButton.onclick=withdrawbalance
// console.log(ethers)

async function getbalance(){
if(typeof window.ethereum !== 'undefined'){
     const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance=await provider.getBalance(contractAddress)
        console.log(ethers.utils.formatEther(balance))
}}
async function withdrawbalance(){
    if(typeof window.ethereum!=="undefined"){
    const provider =new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract=new ethers.Contract(contractAddress,abi,signer)
    try {
        const transactionResponse=await contract.withdraw()
        await listenForTransactionMine(transactionResponse,provider)
    } catch (error) {
        console.log(error);
    }
     
    }
}
async function connect(){
    if(typeof window.ethereum !== "undefined"){
     // console.log("i have metamask")
     try{

         await window.ethereum.request({method:"eth_requestAccounts"})
        }
        catch(error){
            connect.log(error)
        }
        //   console.log("Connected");
        document.getElementById("connectButton").innerHTML="Connected!"
        const accounts=await ethereum.request({method:"eth_accounts"})
        console.log(accounts)
    }
    else{
     document.getElementById("connectButton").innerHTML="Please Install metamask"}
     }

     async function fund(){
        const ethAmount=document.getElementById("ethAmount").value; 
        console.log(`Funding with ${ethAmount}...`)
        if(typeof window.ethereum!=="undefined"){
            //provider 
            //signer  //wallet  
            //^ ABI & Address
            const provider =new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            // console.log(signer)
            const contract=new ethers.Contract(contractAddress,abi,signer)
            console.log(contract)
            try{

                const transactionResponse=await contract.fund({value: ethers.utils.parseEther(ethAmount),
                })
                console.log(transactionResponse);

                await listenForTransactionMine(transactionResponse,provider);
            }
            catch(error){
                console.log(error)
            }
        }
        else{
            console.log("Connect to metamask")
        }
     }
     function listenForTransactionMine(transactionResponse,provider){
        console.log(`Mining ${transactionResponse.hash}...`)
        return  new Promise((resolve,reject)=>{
        provider.once(transactionResponse.hash,(transactionReceipt)=>{
            // console.log(transactionReceipt)
            console.log(`completed ${transactionReceipt.confirmations} confirmations.`)
            resolve()
        })
    })
     }