import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
import { ethers } from "ethers";

// 1. Load whitelist addresses
const addresses = [
  "0x1111111111111111111111111111111111111111",
  "0x2222222222222222222222222222222222222222",
  "0x3333333333333333333333333333333333333333",
  "0x4444444444444444444444444444444444444444"
];

// 2. Convert to checksum addresses
const values = addresses.map(addr => [
  ethers.utils.getAddress(addr) // Proper EIP-55 checksum
]);

// 3. Build Merkle tree
const tree = StandardMerkleTree.of(values, ["address"]);

// 4. Save outputs
console.log("Merkle Root:", tree.root);
fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));

// 5. Generate all proofs
const proofs = {};
for (const [i, [address]] of tree.entries()) {
  proofs[address] = tree.getProof(i);
}
fs.writeFileSync("proofs.json", JSON.stringify(proofs, null, 2));

console.log("Merkle tree and proofs generated successfully!");