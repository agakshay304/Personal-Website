async function deriveKey(password: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const hash = await crypto.subtle.digest("SHA-256", encoder.encode(password));
  return crypto.subtle.importKey("raw", hash.slice(0, 32), { name: "AES-CBC" }, false, ["decrypt"]);
}

export const decryptFile = async (url: string, password: string) => {
  const response = await fetch(url);
  const encryptedData = await response.arrayBuffer();
  const iv = new Uint8Array(encryptedData.slice(0, 16));
  const payload = encryptedData.slice(16);
  const key = await deriveKey(password);
  return crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, payload);
};
