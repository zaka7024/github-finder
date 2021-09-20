import React from 'react';
import UserItem from "./UserItem";
import Spinner from "../layouts/Spinner";

const Users = ({users, loading}) => {
    const usersStyle = {
        display: "flex",
        flexWrap: 'wrap'
    }

    if(loading) {
        return <Spinner />
    }
    return (
        <div style={usersStyle}>
            {users.map(user =>
                <UserItem key={user.id} user={user}/>
            )}
        </div>
    );
}

export default Users;