import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Navbar extends Component {

  state = {
    searchTerm: '',
  };

  handleInputChange = (event) => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm: event.target.value });

    if (searchTerm === '') {
      this.props.onSearch(''); 
    }
  };

  handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    this.props.onSearch(this.state.searchTerm); // Trigger search with current search term
  };

  handleCategoryClick = (category) => {
    this.setState({ searchTerm: '' }); // Clear search term when category is selected
    this.props.onCategoryChange(category); // Pass selected category to parent component
  };
  render() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">News Monkey</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{"--bs-scroll-height": "100px"}}>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/">About</Link>
              </li> */}
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/" onClick={() => this.handleCategoryClick('general')} >General</Link></li>
                  <li><Link className="dropdown-item" to="/science" onClick={() => this.handleCategoryClick('science')} >Science</Link></li>
                  <li><Link className="dropdown-item" to="/business" onClick={() => this.handleCategoryClick('business')} >Business</Link></li>
                  <li><Link className="dropdown-item" to="/sports" onClick={() => this.handleCategoryClick('sports')} >Sports</Link></li>
                  <li><Link className="dropdown-item" to="/entertainment" onClick={() => this.handleCategoryClick('entertainment')} >Entertainment</Link></li>
                  <li><Link className="dropdown-item" to="/health" onClick={() => this.handleCategoryClick('health')} >Health</Link></li>
                  <li><Link className="dropdown-item" to="/technology" onClick={() => this.handleCategoryClick('technology')} >Technology</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" aria-disabled="true" to="/">Link</Link>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={this.handleSearchSubmit}>
          <input
             className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={this.handleInputChange}
                value={this.state.searchTerm}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
          </div>
        </div>
      </nav>
    )
  }
}
