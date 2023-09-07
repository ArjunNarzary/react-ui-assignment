import { Button, Stack } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();


  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py:2 }}>
      <img src="/logo192.png" height={25} alt="my logo" />
      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
        <Button onClick={() => navigate("/")}>
          All Users
        </Button>
        <Button onClick={() => navigate("/roles")}>
          Roles
        </Button>
      </Stack>
    </Stack>
  )
}

export default Header