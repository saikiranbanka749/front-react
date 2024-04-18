import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import DisplayTable from "./DisplayTable";

const FormSubmit = () => {
  const [empData, setEmpData] = useState({
    id: 0,
    name: "",
    email: "",
    contact_number: "",
  });
  const [resData, setResData] = useState([]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "id" && !isNaN(Number(value))) {
      setEmpData({ ...empData, [name]: Number(value) });
    } else {
      setEmpData({ ...empData, [name]: value });
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stringifiedData = JSON.stringify(empData);
    console.log("::::", stringifiedData);
    axios
      .post("http://15.206.124.193/create", stringifiedData)
      .then((res) => {
        setResData(res.data);
        alert("Data added successfully");
        setEmpData({ id: 0, name: "", email: "", contact_number: "" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        fontFamily: "'Times New Roman', Times, serif",
        overflow: "hidden",
      }}
     >
      <div
        style={{
          width: "100%",
          padding: "7px",
          color: "white",
          fontSize: "25px",
          backgroundColor: "blue",
          textAlign: "center",
          fontWeight: "bold",
        }}
        >
        Submit form
      </div>
      <div style={{display:"flex", position :"relative", left:"30px", height:"90vh"}}>
      <form onSubmit={submitHandler}>
        <table style={{ position: "relative", top: "10px" }} align="center">
          <tbody>
            <tr>
              <td>
                <label htmlFor="id">Id</label>
              </td>
              <td>
                <TextField
                  type="number"
                  value={empData.id}
                  onChange={changeHandler}
                  id="id"
                  name="id"
                  label="Id"
                  variant="outlined"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="name">Name</label>
              </td>
              <td>
                <TextField
                  onChange={changeHandler}
                  value={empData.name}
                  id="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">Email</label>
              </td>
              <td>
                <TextField
                  onChange={changeHandler}
                  value={empData.email}
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="contact">Contact</label>
              </td>
              <td>
                <TextField
                  onChange={changeHandler}
                  value={empData.contact_number}
                  id="contact"
                  name="contact_number"
                  label="Contact"
                  variant="outlined"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} align="center">
                <Button
                  sx={{ height: "30px" }}
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div>
        <DisplayTable resData={resData} />
      </div>
      </div>
     
    </div>
  );
};

export default FormSubmit;
