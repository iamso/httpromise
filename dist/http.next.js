/*!
 * httpromise - version 0.1.0
 *
 * Made with ❤ by Steve Ottoz so@dev.so
 *
 * Copyright (c) 2016 Steve Ottoz
 */
'use strict';

export default function http(url) {
  let xhr = new XMLHttpRequest();
  let methods = {};

  function parse(obj) {
    try {
      return JSON.parse(obj);
    }
    catch(ex) {
      return obj;
    }
  }

  ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'].forEach((method) => {
    methods[method] = (data, headers) => {
      return new Promise((resolve, reject) => {
        xhr.open(method.toUpperCase(), url);
        if (!(data instanceof FormData)) {
          try {
            data = JSON.stringify(data);
            xhr.setRequestHeader('Content-type', 'application/json');
          }
          catch(e) {
            xhr.setRequestHeader('Content-type', 'text/plain');
          }
        }
        for (let key of Object.keys(headers)) {
          xhr.setRequestHeader(key, headers[key]);
        }
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(parse(xhr.response));
          }
          else {
            reject(Error(xhr.statusText));
          }
        };
        xhr.onerror = () => {
          reject(Error("Network Error"));
        };
        xhr.send(data);
      });
    };
  });

  return methods;

}
