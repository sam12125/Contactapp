import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Update({ id = { id } }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  // const [id, setId] = useState("");
  const navigate = useNavigate();

  const updateData = async () => {
    const user = {
      name: name,
      number: number,
      email: email,
    };

    try {
      const response = await fetch(
        `https://contactsdata10.onrender.com/api/contacts?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        window.alert("Contact Updated Successfully");
        navigate("/");
        window.location.reload();
      } else {
        window.alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred while updating the contact.");
    }
  };

  return (
    <>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          width: "25%",
          gap: "10px",
          margin: "auto",
        }}
      >
        <h1>Update Contact</h1>
        <input
          placeholder="Enter Updated name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Enter Updated Contact number"
          type="number"
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          placeholder="Enter Updated email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <input placeholder="Enter Id" value={id} /> */}
        <button style={{ cursor: "pointer" }} onClick={updateData}>
          Update
        </button>
      </div>
    </>
  );
}

export default Update;
