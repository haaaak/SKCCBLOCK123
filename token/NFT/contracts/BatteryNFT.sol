pragma solidity >0.4.23;
pragma experimental ABIEncoderV2;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract BatteryNFT is ERC721 {
    constructor (string memory _name, string memory _symbol) public
        ERC721(_name, _symbol)
    {
    }

    struct Battery {
        string _hash;
        string _grade;
        string _date;
        string _org;
    }

    mapping (uint256 => Battery) internal _batteryMap;

    /**
    * Custom accessor to create a unique token
    */
    function mintUniqueTokenTo(
        address _to,
        uint256 _tokenId,
        string memory  _tokenURI,
        string memory  _fileHash,
        string memory  _grade,
        string memory  _date,
        string memory  _org
    ) public
    {
        super._mint(_to, _tokenId);
        super._setTokenURI(_tokenId, _tokenURI);
        _batteryMap[_tokenId]._hash = _fileHash;
        _batteryMap[_tokenId]._grade = _grade;
        _batteryMap[_tokenId]._date = _date;
        _batteryMap[_tokenId]._org = _org;
    }

    function hashByToken(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");
        string memory hash = _batteryMap[tokenId]._hash;
        return hash;
    }

    function tokenByOwner(address owner) public view returns (uint256[] memory) {
        uint count =  super.balanceOf(owner);
        uint256[] memory memoryArray = new uint256[](count);
        for(uint i = 0; i < count; i++) {
            memoryArray[i] = tokenOfOwnerByIndex(owner,i);
        }
        return memoryArray;
    }

    function informationByToken(uint256 tokenId) public view returns (Battery memory) {
        return _batteryMap[tokenId];
    }
}

