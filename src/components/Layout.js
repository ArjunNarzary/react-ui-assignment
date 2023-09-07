import React from 'react'
import Header from './Header'
import { Container } from '@mui/material'

const Layout = ({ children }) => {
  return (
      <Container maxWidth="md" sx={{ py: 5 }}>
          <Header />
          {children}
      </Container>
  )
}

export default Layout