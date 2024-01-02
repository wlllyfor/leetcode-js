// SPDX-License-Identifier: GPL-3.0
// token standard: https://eips.ethereum.org/EIPS/eip-20
pragma solidity >=0.4.16 <0.9.0;
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";


contract ChrisToken {
  using SafeMath for uint256;
  string public name = 'ChrisToken';
  string public symbol = 'CTH';
  uint256 public decimals = 18;
  uint256 public totalSupply;

  mapping(address => uint256) public balanceOf;

  constructor () {
    totalSupply = 1000000 * (10 ** decimals);
    balanceOf[msg.sender] = totalSupply;
  }

  event Transfer(address indexed _from, address indexed _to, uint256 _value);

  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(_to != address(0));
    _transfer(msg.sender, _to, _value);
    return true;
  }

  function _transfer(address _from, address _to, uint256 _value) internal {
    require(balanceOf[_from] >= _value);
    balanceOf[_from] = balanceOf[_from].sub(_value);
    balanceOf[_to] = balanceOf[_to].add(_value);

    emit Transfer(_from, _to, _value);
  }
}