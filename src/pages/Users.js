import React, { useState } from 'react'
import TitleContainer from '../components/TitleContainer'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import UserModal from '../components/UserModal'
import UsersTable from '../components/UsersTable'
import AlertModal from '../components/AlertModal'
import { deleteUser } from '../redux/slices/userList'
import { Grid } from '@mui/material'

const Users = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.USERLIST);
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    const addUser = () => {
        setCurrentUser({});
        setShowModal(true);
    };
    const handleClose = () => {
        setCurrentUser({});
        setShowModal(false);
    };

    const handleEditUser = (user) => {
        setCurrentUser(user)
        setIsEdit(true);
        setShowModal(true)
    }

    const handleDeleteUser = (user) => {
        setCurrentUser(user)
        setShowAlert(true);
    }

    const confirmDelete = () => {
        if (!currentUser?.id) {
            handleCloseAlert();
            return;
        }
        dispatch(deleteUser(currentUser));
        handleCloseAlert();
    }

    const handleCloseAlert = () => {
        setCurrentUser({});
        setShowAlert(false);
    }


    return (
        <Layout>
            <TitleContainer title="User List" onAddClick={addUser} />
            {allUsers.length > 0 ?
                <UsersTable
                    items={allUsers}
                    editUser={handleEditUser}
                    deleteUser={handleDeleteUser}
                /> :
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ py:5, color: "grey" }}
                >
                    No user available
                </Grid>
            }
            <UserModal
                title="Add User"
                handleClose={handleClose}
                allUsers={allUsers} 
                isEdit={isEdit} 
                open={showModal}
                currentUser={currentUser}
            />
            <AlertModal
                showAlter={showAlert}
                confirmDelete={confirmDelete}
                handleCloseAlert={handleCloseAlert}
                text={`Are you sure you want to delete ${currentUser?.name} from the list?`}
            />
        </Layout>
    )
}

export default Users