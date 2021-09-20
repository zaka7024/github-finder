import './App.css';
import React from "react";
import axios from "axios";
import Navbar from "./components/layouts/Navbar"
import Users from "./components/users/Users";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
import Search from "./components/users/Search";
import {BrowserRouter as Browser, Switch, Route} from "react-router-dom";

class App extends React.Component {

    state = {
        users: [],
        loading: false,
        alert: null
    }

    async componentDidMount() {
        this.setState({loading: true})
        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.GITHUB_CLIENT_ID}&clint_secret=${process.env.GITHUB_CLIENT_ID}`)
        this.setState({users: res.data, loading: false})
    }

    handleUsersSearch = async text => {
        this.setState({loading: true})
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.GITHUB_CLIENT_ID}&clint_secret=${process.env.GITHUB_CLIENT_ID}`)
        this.setState({users: res.data.items, loading: false})
    }

    handleClearUsers = () => {
        this.setState({users: []})
    }

    setAlert = (msg, type) => {
        this.setState({alert: {msg, type}})
        setTimeout(() => this.setState({alert: null}), 3000)
    }

    render() {
        return (
            <React.Fragment>
                <Browser>
                    <Navbar/>
                    <div className="container">
                        <Alert alert={this.state.alert}/>
                        <Switch>
                            <Route exact path='/' render={
                                props =>
                                    <React.Fragment>
                                        <Search
                                            onSearch={this.handleUsersSearch}
                                            onClear={this.handleClearUsers}
                                            showClear={this.state.users.length > 0}
                                            setAlert={this.setAlert}/>
                                        <Users
                                            users={this.state.users}
                                            loading={this.state.loading}/>
                                    </React.Fragment>
                            }/>
                            <Route exact path='/about' render={
                                props => <About/>
                            }/>
                        </Switch>
                    </div>
                </Browser>
            </React.Fragment>
        );
    }
}

export default App;
