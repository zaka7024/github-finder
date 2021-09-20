import React from 'react';
import PropTypes from "prop-types";

const UserItem = ({user: {login, avatar_url, html_url}}) => {
    return (
        <div className="card text-center">
            <h3>{login}</h3>
            <img
                src={avatar_url}
                alt=""
                className="round-img"
                style={{width: '60px'}}/>
            <div>
                <a className="btn btn-dark btn-sm my-1" href={html_url}>MORE</a>
            </div>
        </div>
    );
}

UserItem.propType = {
    user: PropTypes.object.isRequired,
}

export default UserItem;