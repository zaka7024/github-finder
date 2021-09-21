import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import RepoList from "../repos/RepoList";
import Spinner from "../layouts/Spinner";

const User = ({user, repos, loading, match, getUser, getUserRepos}) => {

    useEffect(() => {
        const username = match.params['login']
        getUser(username)
        getUserRepos(username)
        // eslint-disable-next-line
    }, [])

    const {
        login,
        avatar_url,
        html_url,
        location,
        name,
        bio,
        hireable,
        company,
        blog,
        followers,
        following,
        public_repos,
        public_gists
    } = user;

    if (loading) {
        return <Spinner/>
    }
    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>
                Back To Search
            </Link>
            Hireable: {hireable ? <i className='fas fa-check text-success'/> :
            <i className='fas fa-times-circle text-danger'/>}
            <div style={
                {
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: 'auto',
                    justifyContent: 'center'
                }} className='fade-in'>
                <div className='profile-section'>
                    <img src={avatar_url} alt="Profile"
                         className='round-img'
                    style={{width: '150px'}}/>
                    <h2>{name}</h2>
                    {location && <p>Location: {location}</p>}
                </div>
                {bio && <div className='profile-section'>
                    {<Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                        <a href={html_url} className='btn btn-dark btn-block my-3'>Visit Github Page</a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                    Username: {login}
                                </Fragment>}
                            </li>
                            <li>
                                {company && <Fragment>
                                    Company: {company}
                                </Fragment>}
                            </li>
                            <li>
                                {blog && <Fragment>
                                    Blog: {blog}
                                </Fragment>}
                            </li>
                        </ul>
                    </Fragment>}
                </div>}
            </div>
            <div className='fade-in text-center'>
                <div className='badge badge-primary'>Followers: {followers}</div>
                <div className='badge badge-success'>Following: {following}</div>
                <div className='badge badge-light'>Public Repos: {public_repos}</div>
                <div className='badge badge-dark'>Public Gists: {public_gists}</div>
            </div>
            <RepoList repos={repos}/>
        </Fragment>
    );
}

User.propTypes = {
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
};

export default User;