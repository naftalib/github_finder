import { Component } from 'react'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/Search'
import './App.css';
import axios from 'axios';


const github = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 1000,
  headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN }
})

class App extends Component{
  state = {
    users: [],
    loading: false
  }


  // async componentDidMount(){
  //   this.setState({ loading:true })

  //   const res = await axios.get(`https://api.github.com/users?client_id=
  //   ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
  //   ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
  //   this.setState({users: res.data, loading: false})
  // }

  // Search github users
   searchUsers = async text => {
    this.setState({loading:true});
    const res = await github.get(`/search/users?q=${text}`)
    this.setState({users: res.data.items, loading: false});
    }


  render(){
    return (
        <div className="App">
          <Navbar />
          <div className="container">
            <Search searchUsers={this.searchUsers}/>
            <Users loading ={this.state.loading} users ={this.state.users}/>
          </div>
          
        </div>
    )
  }
}

export default App;
