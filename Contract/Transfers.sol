// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract Transfers
{
  struct Transfer
  {
    uint amount;
    uint timestamp;
    address sender;
  }

  Transfer[] transfers;

  address owner;
  uint8 maxTransfers;
  uint8 currentTransfers;

  constructor(uint8 _maxTansfers)
  {
    owner = msg.sender;
    maxTransfers = _maxTansfers;
  }

  modifier onlyOwner()
  {
    require(owner == msg.sender, "Not an owner");
    _;
  }

  function getTransfer(uint _index)
  public
  view
  returns(Transfer memory)
  {
    require(_index < transfers.length, "Cannot find transfer.");
    return transfers[_index];
  }

  function withdrawTo(address payable _to)
  public
  onlyOwner
  {
    _to.transfer(address(this).balance);
  }

  receive() 
  external 
  payable
  {
    if (currentTransfers >= maxTransfers)
    {
        revert("Cannot accept more transfers.");
    }
    Transfer memory newTransfer = Transfer(msg.value, block.timestamp, msg.sender);
    transfers.push(newTransfer);
    currentTransfers++;
  }
  
  function Say18() 
  public
  pure
  returns (uint) 
  {
    return 18;
  }
    
  function GetCountCurrentTransfers() 
  public
  view
  returns (uint) 
  {
    return currentTransfers;
  }

}