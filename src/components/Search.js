import React, { Component } from 'react'

class Search extends Component {

    state = {
        text:''
    }

    onChange = () => {
        this.setState
    }
    render() {
        return (
            <div>
                <form className="form">
                    <input type="text" name='text' placeholder='search users...' />
                    <input 
                    type="submit"
                    value='Search'
                    className='btn btn-dark btn-block'
                    value={this.state.text}
                    onChange={this.onChange}
                    />
                </form>
            </div>
        )
    }
}

export default Search
