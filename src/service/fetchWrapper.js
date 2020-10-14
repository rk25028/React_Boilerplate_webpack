/**
 * This file needs to be removed once redux is integrated on all the screens
 */
import NodeRSA from "node-rsa";
import { X_API_KEY } from "../config";

export function fetchWrapper(
  url,
  method,
  headerData,
  bodyData,
  successCallBack,
  failureCallback
) {
  const key = new NodeRSA({ b: 512 });
  const text = "Hello RSA!";
  const encrypted = key.encrypt(text, "base64");
  fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-key": X_API_KEY,
      ...headerData,
    },
    body: bodyData ? JSON.stringify(bodyData) : null,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      successCallBack(data);
    })
    .catch((err) => {
      failureCallback(err);
    });
}
