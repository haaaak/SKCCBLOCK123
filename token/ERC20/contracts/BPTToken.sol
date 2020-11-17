pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract BPTToken is ERC20Detailed, ERC20, Ownable {

  constructor (string memory _name, string memory _symbol, uint8 _decimals, uint256 _totalSupply)
  ERC20Detailed(_name, _symbol, _decimals)
  public {
    _mint(owner(), _totalSupply * 10**uint(_decimals));
  }

  function () external payable {
  }
}
