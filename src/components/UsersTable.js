import React from 'react'
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const UsersTable = ({ items, editUser, deleteUser }) => {
  return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                  <TableRow>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Username</TableCell>
                      <TableCell align="center">Mobile</TableCell>
                      <TableCell align="center">Rolekey</TableCell>
                      <TableCell align="center">Password</TableCell>
                      <TableCell align="center">Actions</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {items.map((row) => (
                      <TableRow
                          key={row.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                          <TableCell align="center" component="th" scope="row">
                              {row.name}
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                              {row.email}
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                              {row.username}
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                              {row.mobile}
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                              {row.role}
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                              {row.password}
                          </TableCell>
                          <TableCell align="center">
                              <Stack direction="row" spacing={2} justifyContent="center">
                                  <Button size="small" variant="contained" endIcon={<EditIcon />} onClick={() => editUser(row)}>
                                      Edit
                                  </Button>
                                  <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => deleteUser(row)}>
                                      Delete
                                  </Button>
                              </Stack>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </TableContainer>
  )
}

export default UsersTable