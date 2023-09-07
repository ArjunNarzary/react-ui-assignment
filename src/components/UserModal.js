import React from 'react'
import { Box, Modal, Typography, Container, TextField, Stack, Button, InputLabel, Select, MenuItem } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { addUser, editUser } from '../redux/slices/userList';

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

const UserModal = ({ open, handleClose, title, allUsers, isEdit, currentUser = {} }) => {
    const dispatch = useDispatch();
    const allRoles = useSelector(state => state.ROLES);

    const checkIfAlreadyAvailable = (term) => {
        const index = allUsers.findIndex(user => user.username === term && term !== currentUser?.username);
        if (index !== -1) return true;
        return false;
    }

    const checkIfRoleExist = (roleKey) => {
        const index = allRoles.findIndex(role => role.roleKey === roleKey);
        if (index !== -1) return true;
        return false;
    }

    const checkValideMobileNumber = (number) => {
        if(typeof number !== "number"){
            return false;
        }else if(number.toString().length !== 10){
            return false;
        }else{
            return true;
        }
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
                            name: isEdit ? currentUser?.name : "",
                            email: isEdit ? currentUser?.email : "",
                            username: isEdit ? currentUser?.username : "",
                            mobile: isEdit ? currentUser?.mobile : "",
                            role: isEdit ? currentUser?.role : "",
                            password: "",
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = 'Name is required';
                            } else if (!values.email) {
                                errors.email = "Email key is required";
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = "Invalid email address";
                            } else if (!values.username) {
                                errors.username = "Username key is required";
                            } else if (checkIfAlreadyAvailable(values.username)) {
                                errors.username = "Username must be unique";
                            } else if (/\s/.test(values.username.trim())) {
                                errors.username = "Username must not contain whitespace";
                            } else if (!values.mobile) {
                                errors.mobile = "Mobile is require";
                            } else if (!checkValideMobileNumber(values.mobile)) {
                                errors.mobile = "Enter valid 10 digit mobile number";
                            } else if (!values.role) {
                                errors.role = "Role is required";
                            } else if (!checkIfRoleExist(values.role)) {
                                errors.role = "Select valid role";
                            } else if (!values.password) {
                                errors.password = "Password is required";
                            }
                            return errors;
                        }}

                        onSubmit={(values, { setSubmitting }) => {
                            if (isEdit) {
                                dispatch(editUser({ id: currentUser?.id, ...values, username: values.username.trim() }));
                            } else {
                                dispatch(addUser({ ...values, username: values.username.trim(), id: uuidv4() }));
                            }
                            setSubmitting(false);
                            handleClose();
                        }}

                    >

                        {({
                            values,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,

                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={2}>
                                    <FormControl error variant="standard">
                                        <TextField
                                            fullWidth
                                            error={errors.name ? true : false}
                                            id="name"
                                            name="name"
                                            label="Name"
                                            defaultValue={values?.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            size="small"
                                            aria-describedby="name-error-text"
                                        />
                                        {<FormHelperText id="name-error-text">{errors.name}</FormHelperText>}
                                    </FormControl>
                                    <FormControl error variant="standard">
                                        <TextField
                                            fullWidth
                                            error={errors.email ? true : false}
                                            id="email"
                                            name="email"
                                            label="Email"
                                            defaultValue={values?.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            size="small"
                                            aria-describedby="email-error-text"
                                        />
                                        {<FormHelperText id="email-error-text">{errors.email}</FormHelperText>}
                                    </FormControl>
                                    <FormControl error variant="standard">
                                        <TextField
                                            fullWidth
                                            error={errors.username ? true : false}
                                            id="username"
                                            name="username"
                                            label="Username"
                                            defaultValue={values?.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            size="small"
                                            aria-describedby="username-error-text"
                                        />
                                        {<FormHelperText id="username-error-text">{errors.username}</FormHelperText>}
                                    </FormControl>
                                    <FormControl error variant="standard">
                                        <TextField
                                            fullWidth
                                            error={errors.mobile ? true : false}
                                            id="mobile"
                                            name="mobile"
                                            label="Mobile"
                                            type="number"
                                            defaultValue={values?.mobile}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            size="small"
                                            aria-describedby="mobile-error-text"
                                        />
                                        {<FormHelperText id="mobile-error-text">{errors.mobile}</FormHelperText>}
                                    </FormControl>
                                    <FormControl size="small" fullWidth>
                                        <InputLabel id="user-rol-label-id" size="small">Role Key</InputLabel>
                                        <Select
                                            labelId="user-rol-label-id"
                                            id="role"
                                            name="role"
                                            value={values?.role}
                                            error={errors.role ? true : false}
                                            label="Role Key"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            size="small"
                                            aria-describedby="role-error-text"
                                        >
                                            {allRoles.map(role => (
                                                <MenuItem key={role.id} value={role.roleKey}>{role.roleKey}</MenuItem>
                                            ))}
                                        </Select>
                                        {<FormHelperText id="role-error-text" sx={{ color: "red" }}>{errors.role}</FormHelperText>}
                                    </FormControl>
                                    <FormControl error variant="standard">
                                        <TextField
                                            fullWidth
                                            error={errors.password ? true : false}
                                            id="password"
                                            name="password"
                                            label="password"
                                            type="password"
                                            defaultValue={values?.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            size="small"
                                            aria-describedby="password-error-text"
                                        />
                                        {<FormHelperText id="password-error-text">{errors.password}</FormHelperText>}
                                    </FormControl>
                                </Stack>
                                <Button type="submit" disabled={isSubmitting} variant="contained" sx={{ mt: 5, width: "100%" }} >Submit</Button>


                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </Modal>
    )
}

export default UserModal