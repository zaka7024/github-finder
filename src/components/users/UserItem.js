import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const UserItem = ({user: {login, avatar_url}}) => {
    const path = `user/${login}`;
    return (
        <Link to={path}>
            <div className="card pointer text-center slide-down">
                <Link to={path}>
                    <h3>{login}</h3>
                </Link>
                <img
                    src={avatar_url}
                    alt=""
                    className="round-img"
                    style={{width: '60px'}}/>
                <div>
                    <Link to={path}>
                        <span className="btn btn-dark btn-sm my-1">MORE</span>
                    </Link>
                </div>
            </div>
        </Link>
    );
}

UserItem.propType = {
    user: PropTypes.object.isRequired,
}

export default UserItem;
