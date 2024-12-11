"use client";
import React from "react";
import axios from "axios";
import { xml2json } from "xml-js";

export default function Todos() {
  const handleGetXml = () => {
    axios({
      method: "get",
      url: "https://mocktarget.apigee.net/xml",
    }).then((res) => {
      if (res?.headers["content-type"]?.includes("application/xml")) {
        console.log(xml2json(res.data));
      }

      if (res?.headers["content-type"]?.includes("application/json")) {
        console.log(res);
      }
    });
  };

  return (
    <div>
      <button onClick={handleGetXml}>get XML</button>
      Test
    </div>
  );
}
