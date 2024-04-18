import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

interface Employee {
  id: number;
  name: string;
  email: string;
  contact_number: string;
}

type PropsRowData = {
  resData: any;
};

const DisplayTable: React.FC<PropsRowData> = ({ resData }) => {
  const [empData, setEmpData] = useState<Employee[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        const response = await axios.get<Employee[]>("http://15.206.124.193/users");
        setEmpData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [resData]);

  const rowsPerPage = 5;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = empData.slice(startIndex, endIndex);

  return (
    <div style={{ position: "relative" }}>
      <TableContainer
        sx={{ width: 500, position: "relative", top: "10px", left: "500px" }}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontWeight: "bold",
                }}
                align="right"
              >
                Id
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontWeight: "bold",
                }}
                align="right"
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontWeight: "bold",
                }}
                align="right"
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontWeight: "bold",
                }}
                align="right"
              >
                Contact
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.contact_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ textAlign: "right", position: "relative", left: "350px", top: "10px" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={endIndex >= empData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DisplayTable;
