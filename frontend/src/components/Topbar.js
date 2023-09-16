import React from "react";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate("/create");
  };

  const handleUpdate = () => {
    navigate("/update");
  };

  const handleDelete = () => {
    navigate("/delete");
  };

  const handleContact = () => {
    navigate("/");
  };
  return (
    <>
      <div>
        <button onClick={handleCreate}>Create Contacts</button>
        <button onClick={handleUpdate}>Update Contacts</button>
        <button onClick={handleDelete}>Delete Contacts</button>
      </div>
      <div>
        <button onClick={handleContact}>Contact List</button>
      </div>
    </>
  );
}

export default Topbar;
