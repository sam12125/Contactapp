import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { CSVLink } from "react-csv";

function Get() {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [dataToRender, setDataToRender] = useState([]);
  const [name, setName] = useState("");

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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Get;
