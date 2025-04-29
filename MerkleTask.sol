// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts@4.9.3/utils/cryptography/MerkleProof.sol";

contract Whitelist {
    bytes32 public immutable merkleRoot;
    
    constructor(bytes32 root) {
        merkleRoot = root;
    }

    function checkWhitelist(bytes32[] calldata proof, address user) public view returns (bool) {
        bytes32 leaf = keccak256(abi.encode(user));
        return MerkleProof.verify(proof, merkleRoot, leaf);
    }
}