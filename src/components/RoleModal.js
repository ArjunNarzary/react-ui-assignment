import React from 'react'
import { Box, Modal, Typography, Container, TextField, Stack, Button } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { addRole, editRole } from '../redux/slices/roles'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
}

const RoleModal = ({ open = false, handleClose, title, allRoles, isEdit, currentRole={} }) => {
    const dispatch = useDispatch();

    const checkIfAlreadyAvailable = (term) => {
        const index = allRoles.findIndex(role => role.roleKey === term && term !== currentRole?.roleKey);
        if (index !== -1) return true;
        return false;
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Container maxWidth="lg" sx={{ py: 5 }}>
                    <Formik
                        initialValues={{ 
                            roleLabel: isEdit ? currentRole?.roleLabel : "", 
                            roleKey: isEdit ? currentRole?.roleKey : ""
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.roleLabel) {
                                errors.roleLabel = 'Role lebel is required';
                            } else if (!values.roleKey) {
                                errors.roleKey = "Role key is required";
                            } else if (checkIfAlreadyAvailable(values.roleKey)) {
                                errors.roleKey = "Role key must be unique";
                            }
                            return errors;
                        }}

                        onSubmit={(values, { setSubmitting }) => {
                            if(isEdit){
                                dispatch(editRole({id:currentRole?.id, ...values}));
                            }else{
                                dispatch(addRole({...values, id: uuidv4() }));
                            }
                            setSubmitting(false);
                            handleClose();
                        }}

                    >

                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */

                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={2}>
                                    <FormControl error variant="standard">
                                        <TextField
                                            fullWidth
                                            error={errors.roleLabel ? true : false}
                                            id="roleLabel"
                                            label="Role Label"
                                            defaultValue={values?.roleLabel}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            size="small"
                                        />
                                        {<FormHelperText id="component-error-text">{errors.roleLabel}</FormHelperText>}
                                    </FormControl>
                                    <FormControl error variant="standard">
                                        <TextField
                                            fullWidth
                                            error={errors.roleKey ? true : false}
                                            id="roleKey"
                                            label="Role Key"
                                            defaultValue={values?.roleKey}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            size="small"
                                        />
                                        {<FormHelperText id="component-error-text">{errors.roleKey}</FormHelperText>}
                                    </FormControl>
                                </Stack>
                                {/* <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                {errors.password && touched.password && errors.password} */}
                                {/* <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button> */}
                                <Button type="submit" disabled={isSubmitting} variant="contained" sx={{ mt: 5, width: "100%" }} >Submit</Button>


                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </Modal>
    )
}

export default RoleModal