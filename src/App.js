import { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layouts/Alert'
import About from './components/pages/About'
import axios from 'axios'
import './App.css'


//Acess permision for github API
const github = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 1000,
  headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN }
})
 
class App extends Component {
  state ={
    users:[],
    user:{},
    repos: [],
    loading: false,
    alert: null
  }
 
  // static propTypes = {
  //   searchUsers: PropTypes.func.isRequired,
  //   clearchUsers: PropTypes.func.isRequired,
  //   showClear: PropTypes.bool.isRequired,

  // }

 //Search functinality API call
  searchUsers = async text => {
    this.setState({ loading:true });
    const res = await github.get(`/search/users?q=${text}`)
    this.setState({users: res.data.items, loading: false});
    }

  //Get single Github user
  getUser = async username => {
    this.setState({ loading:true });

    const res = await github.get(`/users/${username}`)
    this.setState({user: res.data, loading: false});
  }

  //Get users repos
  getUserRepos = async username => {
    this.setState({ loading:true });

    const res = await github.get(`/users/${username}/repos?per_page=5&sort=created:asc`)
    this.setState({repos: res.data, loading: false});
  }

  //Clear Users from state
  clearUsers = () => this.setState ({ users: [], loading: false }) 

  //Set Alert to enter valid text
  setAlert = (msg, type) => {
    this.setState({ alert: {msg, type} })

  setTimeout(() => this.setState({ alert:null }), 3000)
  }
 
  render(){
    const { users, loading, user, repos  } = this.state

    return (
      <Router>
      <div className="App">
        <Navbar/>
        <div className="container">
          <Alert alert={this.state.alert} />
          <Switch>
            <Route 
            exact
            path='/'
            render={props => (
              <Fragment>
                <Search 
                searchUsers={this.searchUsers}
                clearUsers={this.clearUsers}
                showClear={users.length > 0 ? true : false}
                setAlert ={this.setAlert}
                />
                <Users loading={loading} users={users}/>
              </Fragment>
            )}
            />
            <Route exact path='/about' component={About} />
            <Route 
              exact 
              path='/user/:login' 
              render={props => (
                <User 
                { ...props } 
                getUser={this.getUser} 
                getUserRepos={this.getUserRepos}
                user={user} 
                repos={repos}
                loading={loading} 
                />
            )} />
          </Switch>
            
        </div>
      </div>
      </Router>
    );
  } 
}
export default App;