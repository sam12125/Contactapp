import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const postData = async () => {
    const user = {
      name: name,
      number: number,
      email: email,
    };

    try {
      const response = await fetch("http://localhost:8080/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        window.alert("Contact Added Successfully");
        navigate("/");
      } else {
        window.alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred while adding the contact.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "25%",
        gap: "10px",
        margin: "auto",
      }}
    >
      <h1>Create Contacts</h1>
      <input
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Enter Contact number"
        type="number"
        onChange={(e) => setNumber(e.target.value)}
      />
      <input
        placeholder="Enter email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button style={{ cursor: "pointer" }} onClick={postData}>
        Post
      </button>
    </div>
  );
}

export default Create;
