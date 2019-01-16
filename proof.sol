pragma solidity ^0.5.0;

contract Proof
{
      
    struct FileDetails
	{
		uint timestamp; 
                string owner;
       }
      mapping(string =>FileDetails) files;
    event logFileAddedStatus(bool status, uint timestamp, string owner, string fileHash);

      //this is used to store the owner of file at the block timestamp
      function set(string memory owner, string memory fileHash) public
            {
		if(files[fileHash].timestamp == 0){
                    files[fileHash]=FileDetails(block.timestamp,owner);
                         
                 emit logFileAddedStatus(true,block.timestamp,owner,fileHash);
                   }
                else {
                  emit logFileAddedStatus(false,block.timestamp,owner,fileHash);
                     }
            }
    
         //get file information
          function get(string memory fileHash) public view returns (uint timestamp,string memory owner)
               {
                   return (files[fileHash].timestamp, files[fileHash].owner);
                }
           }

