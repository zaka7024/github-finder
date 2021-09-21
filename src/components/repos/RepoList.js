import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from "./RepoItem";

function RepoList({repos}) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            margin: 'auto',
        }} className='fade-in'>
            {repos.map(repo => <RepoItem repo={repo} key={repo.id}/>)}
        </div>
    );
}

RepoList.propTypes = {
    repos: PropTypes.array.isRequired,
};
export default RepoList;