import React, { useState } from 'react'
import Layout from '../components/Layout'
import TitleContainer from '../components/TitleContainer'
import { useDispatch, useSelector } from 'react-redux'
import RoleModal from '../components/RoleModal'
import RolesTable from '../components/RolesTable'
import { deleteRole } from '../redux/slices/roles'
import AlertModal from '../components/AlertModal'
import { deleteAllUserWithRole } from '../redux/slices/userList'
import { Grid } from '@mui/material'

const Roles = () => {
    const dispatch = useDispatch();
    const roles = useSelector(state => state.ROLES);
    const [showAddModel, setShowAddModel] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentRole, setCurrentRole] = useState({});
    const [showAlter, setShowAlter] = useState(false);

    const addRole = () => {
        setIsEdit(false);
        setCurrentRole({});
        setShowAddModel(true)
    };
    const handleClose = () => {
        setIsEdit(false);
        setCurrentRole({});
        setShowAddModel(false)
    };

    const editRole = (role) => {
        setCurrentRole(role)
        setIsEdit(true);
        setShowAddModel(true)
    }

    const handleDeleteRole = (role) => {
        setCurrentRole(role);
        setShowAlter(true);
    }

    const confirmDelete = () => {
        if (!currentRole?.id) {
            handleCloseAlert();
            return;
        }
        dispatch(deleteRole(currentRole));
        //delete users with current role
        dispatch(deleteAllUserWithRole(currentRole));
        setCurrentRole({});
        handleCloseAlert();
    }

    const handleCloseAlert = () => {
        setCurrentRole({});
        setShowAlter(false);
    }

    return (
        <Layout>
            <TitleContainer title="Roles" onAddClick={addRole} />
            {roles.length > 0 ?
                <RolesTable items={roles} editRole={editRole} deleteRole={handleDeleteRole} /> :
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ py: 5, color: "grey" }}
                >
                    No role available
                </Grid>
            }
            {<RoleModal
                open={showAddModel}
                handleClose={handleClose}
                title={isEdit ? "Edit" : "Add Role"}
                allRoles={roles}
                isEdit={isEdit}
                currentRole={currentRole}
            />}

            <AlertModal
                showAlter={showAlter}
                confirmDelete={confirmDelete}
                handleCloseAlert={handleCloseAlert}
                text={`Are you sure you want to delete ${currentRole?.roleLabel} from this list? This will also delete all users with this role.`}
            />


        </Layout>
    )
}

export default Roles