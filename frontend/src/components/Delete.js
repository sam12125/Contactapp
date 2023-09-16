import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Delete() {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const deleteData = async () => {
    try {
      const response = await fetch(
        `https://contactsdata10.onrender.com/api/contacts?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        window.alert("Contact Deleted Successfully");
        navigate("/");
      } else {
        window.alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred while deleting the contact.");
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
        <h1>Delete Contacts by Id</h1>
        <input placeholder="Enter Id" onChange={(e) => setId(e.target.value)} />
        <button style={{ cursor: "pointer" }} onClick={deleteData}>
          Delete
        </button>
      </div>
    </>
  );
}

export default Delete;
