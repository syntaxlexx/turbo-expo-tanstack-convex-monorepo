import { exportJWK, exportPKCS8, generateKeyPair } from "jose";
import { writeFileSync } from "fs";

const keys = await generateKeyPair("RS256", {
  extractable: true,
});
const privateKey = await exportPKCS8(keys.privateKey);
const publicKey = await exportJWK(keys.publicKey);
const jwks = JSON.stringify({ keys: [{ use: "sig", ...publicKey }] });

const output = `JWT_PRIVATE_KEY=\n${privateKey.trimEnd().replace(/\n/g, " ")}\n\nJWKS=\n${jwks}`;
writeFileSync("generatedKeys.txt", output);
