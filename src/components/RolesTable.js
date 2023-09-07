import React from 'react'
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const RolesTable = ({ items, editRole, deleteRole }) => {
  return (
      <TableContainer component={Paper} sx={{ mt:2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                  <TableRow>
                      <TableCell align="center">Role Label</TableCell>
                      <TableCell align="center">Role Key</TableCell>
                      <TableCell align="center">Actions</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {items.map((row) => (
                      <TableRow
                          key={row.roleKey}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                          <TableCell align="center" component="th" scope="row">
                              {row.roleLabel}
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                              {row.roleKey}
                          </TableCell>
                          <TableCell align="center">
                              <Stack direction="row" spacing={2} justifyContent="center">
                                  <Button size="small" variant="contained" endIcon={<EditIcon />} onClick={() => editRole(row)}>
                                      Edit
                                  </Button>
                                  <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => deleteRole(row)}>
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

export default RolesTable