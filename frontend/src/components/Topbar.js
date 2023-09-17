import React from "react";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate("/create");
  };

  const handleContact = () => {
    navigate("/");
  };
  return (
    <>
      <div>
        <button onClick={handleCreate}>Create Contacts</button>
      </div>
      <div>
        <button onClick={handleContact}>Contact List</button>
      </div>
    </>
  );
}

export default Topbar;
