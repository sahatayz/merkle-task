import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";

// Step 1: Address list
const addresses = [
  "0x1111111111111111111111111111111111111111",
  "0x2222222222222222222222222222222222222222",
  "0x3333333333333333333333333333333333333333",
  "0x4444444444444444444444444444444444444444"
];

// Step 2: Create Merkle tree
const tree = StandardMerkleTree.of(addresses.map(a => [a]), ["address"]);

// Step 3: Save outputs
console.log("Merkle Root:", tree.root); // ← Use this in contract
fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));

// Step 4: Generate proofs
const proofs = {};
for (const [i, [address]] of tree.entries()) {
  proofs[address] = tree.getProof(i);
}
fs.writeFileSync("proofs.json", JSON.stringify(proofs, null, 2));