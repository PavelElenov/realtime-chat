import { Fragment, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const IsUser = () => {
    const user = localStorage.getItem("user");

    return (
        <Fragment>
            {user ? <Outlet /> : <Navigate to="/login"/>}
        </Fragment>
    );
};

export default IsUser;