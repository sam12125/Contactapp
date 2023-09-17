import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import Update from "./Update";

function Get() {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [dataToRender, setDataToRender] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [editContact, setEditContact] = useState(null);

  const fetchData = () => {
    axios.get("https://contactsdata10.onrender.com/api/contacts").then(
      (response) => {
        const data = response.data;
        setUsers(data);
        setDataToRender(data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSortChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    sortData(newSortOrder);
  };

  const sortData = (order) => {
    const sortedData = [...dataToRender].sort((a, b) => {
      const compareResult = a.name.localeCompare(b.name);
      return order === "asc" ? compareResult : -compareResult;
    });
    setDataToRender(sortedData);
  };

  const handleSearch = () => {
    if (name.trim() === "") {
      setDataToRender(users);
      return;
    }

    const filteredData = users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
    setDataToRender(filteredData);
  };

  const deleteData = async (id) => {
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
        fetchData();
      } else {
        window.alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred while deleting the contact.");
    }
  };

  const handleEdit = (contact) => {
    setEditContact(contact);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "2%",
          paddingRight: "2%",
          marginTop: "20px",
        }}
      >
        <select
          value={sortOrder}
          onChange={handleSortChange}
          style={{ cursor: "pointer", padding: "10px" }}
        >
          <option value="" disabled="disable">
            Sort by name
          </option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <div>
          <input
            placeholder="Search name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "10px" }}
          />
          <button style={{ padding: "10px" }} onClick={handleSearch}>
            Search
          </button>
        </div>

        <div>
          <CSVLink
            data={users}
            filename={"users.csv"}
            style={{ fontSize: "22px" }}
          >
            Download CSV
          </CSVLink>
        </div>
      </div>

      <table
        style={{ width: "100%", overflow: "hidden", marginTop: "20px" }}
        className="styled-table"
      >
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Contact number</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Id</th>
            <th style={{ textAlign: "center" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {dataToRender.map((el, index) => (
            <tr
              key={index}
              style={{ width: "100%", overflow: "hidden" }}
              className="hoverable"
            >
              <td style={{ textAlign: "center" }}>{el.name}</td>
              <td style={{ textAlign: "center", width: "25%" }}>{el.number}</td>
              <td style={{ textAlign: "center" }}>{el.email}</td>
              <td style={{ textAlign: "center" }}>{el._id}</td>
              <td style={{ textAlign: "center" }}>
                <button
                  onClick={() => deleteData(el._id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(el)}
                  style={{ cursor: "pointer" }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editContact && <Update contact={editContact} id={editContact._id} />}
    </>
  );
}

export default Get;
