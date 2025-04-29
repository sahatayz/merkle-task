// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Whitelist {
    bytes32 public immutable merkleRoot;
    
    constructor(bytes32 _root) {
        merkleRoot = _root;
    }

    function checkWhitelist(bytes32[] calldata proof, address user) public view returns (bool) {
        bytes32 leaf = keccak256(abi.encode(user));
        return MerkleProof.verify(proof, merkleRoot, leaf);
    }
}