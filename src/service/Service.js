import NodeRSA from "node-rsa";
import { X_API_KEY } from "../config";

export function fetchWrapper(url, method, headerData, bodyData) {
  const key = new NodeRSA({ b: 512 });
  const text = "Hello RSA!";
  const encrypted = key.encrypt(text, "base64");
  return fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-key": X_API_KEY,
      ...headerData,
    },
    body: bodyData ? JSON.stringify(bodyData) : null,
  });
}
