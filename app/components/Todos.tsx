"use client";
import axios from "axios";
import { useState } from "react";
import { xml2json } from "xml-js";

export default function Todos() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleGetXML = () => {
    axios({
      headers: { accept: "application/xml" },
      method: "get",
      url: "https://mocktarget.apigee.net/xml",
    }).then((res) => {
      if (res.headers["content-type"].includes("application/xml")) {
        const jsonData = xml2json(res.data);
        console.log(`This was converted from XML! ${jsonData}`);
      }
      if (res.headers["content-type"].includes("application/json")) {
        console.log(`This is just json! ${res.data}`);
      }
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmitImage = () => {
    if (!image) {
      alert("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    console.log(formData);

    axios
      .post(
        "http://localhost:8080/todos",
        {
          image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: "10px" }}
        />
        <button onClick={handleSubmitImage}>Submit Image</button>
        <button onClick={handleGetXML}>Get XML</button>
      </div>
      {imagePreview && (
        <img
          style={{ width: "300px" }}
          src={imagePreview}
          alt="Image preview"
        />
      )}
    </div>
  );
}
