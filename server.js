var express=require("express");

var app=express();
var server=require("http").createServer(app);
var io=require("socket.io")(server);
server.listen(8080);

app.use(express.static("public"));

app.get("/",function(req,res){
	res.sendFile(__dirname+ "/public/index.html"); })


console.log("Server up and running on localhost:8080");

var Web3=require("web3");
web3=new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));//port 8485 is RPC of local running Ethereum node software

const metadata=require('../build/contracts/Proof');//deployed contracts from truffle migrate has been in the build folder

const abi=metadata.abi;

const contractAddress="0x823bC07b78E682ed213cF62a1F5e3b9F3aE879e7";


const proof=new web3.eth.Contract(abi,contractAddress);

console.log(proof.methods);//the object of proof from solidity 
console.log(proof.events);





var bigData=[];
var access={};


app.get("/submit",function(req,res){//req is getting from, res is outputting
	var fileHash=req.query.hash;
        var owner=req.query.owner;
        console.log(fileHash);
           
        var f1=fileHash; var o2=owner;           
      proof.methods.set(owner,fileHash).send({from:"0x5d7ab9555069b8675317102bb11518c0f90781cc"}).on('transactionHash',function(hash){console.log(hash);});
         console.log(" \n here is the filehash");
        // console.log(proof.methods.get(fileHash));//shows filehash
           //  console.log(proof.methods.get(owner));        


        // console.log(transaction._parent._address + '\n');//proof's contract address
       //  console.log(transaction.encodeABI());//proof's json?
     res.send("Here is the file's hash: " + req.query.hash);//gets the same filehash and send it 
                 var dict={}; dict[f1]=o2;
                 bigData.push(dict);
                  
                 console.log(bigData);
 
               });
              app.get("/getInfo",function(req,res){
                var fileHash=req.query.hash;
                  console.log(typeof(fileHash));
              
             //var details=proof.methods.get.call(fileHash,{from:"0xaa83b1cd97e62b9bde4722475ac067faa9f5d6f0"}); //call method version broken, currently being updated
               
                 
                
                 for ( var i=0; i<bigData.length;i++){var temp=bigData[i];if(temp.hasOwnProperty(fileHash)){access=temp;break;}}
                   console.log(access);
                res.send(access);
                access={};
                 })

//var proofEvent=proof.events.logFileAddedStatus();

 proof.events.logFileAddedStatus({},(error, result)=>{
if(!error)
{
 if(result.args.status == true)
 {
 io.send(result);
 }
}

console.log(result);
});



console.log("testpoint");

