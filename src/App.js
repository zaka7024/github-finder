import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "./components/layouts/Navbar"
import Users from "./components/users/Users";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
import Search from "./components/users/Search";
import User from "./components/users/User";
import {BrowserRouter as Browser, Route, Switch} from "react-router-dom";

const App = () => {

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)

    useEffect(async () => {
        setLoading(true)
        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.GITHUB_CLIENT_ID}&clint_secret=${process.env.GITHUB_CLIENT_ID}`)
        setLoading(false)
        setUsers(res.data)
    }, [])

    const handleUsersSearch = async text => {
        setLoading(true)
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.GITHUB_CLIENT_ID}&clint_secret=${process.env.GITHUB_CLIENT_ID}`)
        setLoading(false)
        setUsers(res.data.items)
    }

    const handleClearUsers = () => {
        setUsers([])
    }

    const showAlert = (msg, type) => {
        setAlert({msg, type})
        setTimeout(() => setAlert(null), 3000)
    }

    const getUser = async (username) => {
        setLoading(true)
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.GITHUB_CLIENT_ID}&clint_secret=${process.env.GITHUB_CLIENT_ID}`)
        setLoading(false)
        setUser(res.data)
    }

    const getUserRepos = async (username) => {
        setLoading(true)
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&client_id=${process.env.GITHUB_CLIENT_ID}&clint_secret=${process.env.GITHUB_CLIENT_ID}`)
        setLoading(false)
        setRepos(res.data)
    }
    return (
        <React.Fragment>
            <Browser>
                <Navbar/>
                <div className="container">
                    <Alert alert={alert}/>
                    <Switch>
                        <Route exact path='/' render={
                            props =>
                                <React.Fragment>
                                    <Search
                                        onSearch={handleUsersSearch}
                                        onClear={handleClearUsers}
                                        showClear={users.length > 0}
                                        setAlert={showAlert}/>
                                    <Users
                                        users={users}
                                        loading={loading}/>
                                </React.Fragment>
                        }/>
                        <Route exact path='/about' render={
                            props => <About/>
                        }/>
                        <Route exact path='/user/:login' render={
                            props => <User {...props}
                                           getUser={getUser}
                                           getUserRepos={getUserRepos}
                                           user={user}
                                           repos={repos}
                                           loading={loading}/>
                        }/>
                    </Switch>
                </div>
            </Browser>
        </React.Fragment>
    );
}

export default App;
