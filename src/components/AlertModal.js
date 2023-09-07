import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

const AlertModal = ({ showAlter, handleCloseAlert, text, confirmDelete }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    
  return (
      <Dialog
          fullScreen={fullScreen}
          open={showAlter}
          onClose={handleCloseAlert}
          aria-labelledby="responsive-dialog-title"
      >
          <DialogTitle id="responsive-dialog-title">
              {"Alert"}
          </DialogTitle>
          <DialogContent>
              <DialogContentText>
                    {text}
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={confirmDelete} variant="outlined" sx={{ color: 'grey' }}>
                  Confirm
              </Button>
              <Button onClick={handleCloseAlert} variant="outlined" autoFocus>
                  Cancel
              </Button>
          </DialogActions>
      </Dialog>
  )
}

export default AlertModal