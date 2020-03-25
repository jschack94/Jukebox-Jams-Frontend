import React from 'react'

class Search extends React.Component {
  state={
    query: ''
  }

  handleChange = (event) => {
    const input = event.target.value
    this.setState({
      [event.target.name]: input
    })
  }

  handleSubmit = (event) => {
		event.preventDefault()
		this.props.fetchSearchedSongs(this.state.query)
	}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input id='search-input' type='text' name='query' value={this.state.query} onChange={this.handleChange}/>
        <button type='submit'>Search</button>
       </form>
    );
  }
}
export default Search;