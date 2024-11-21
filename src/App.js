import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import PropTypes from "prop-types";
import News from "./Components/News";
import LoadingBar from "react-top-loading-bar";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      category: "general", // Default category
      progress: 10,
    };
  }

  static defaultProps = {
    pageSize: 9,
  };

  static propTypes = {
    pageSize: PropTypes.number,
  };

  handleSearch = (searchTerm) => {
    this.setState({ searchTerm });
  };

  handleCategoryChange = (newCategory) => {
    this.setState({
      category: newCategory,
      searchTerm: "",
    });
  };

  handleProgress = (progress) => {
    this.setState({ progress });
  };

  render() {
    const apiKey = process.env.REACT_APP_NEWS_MONKEY_API_KEY; // Access environment variable

    return (
      <Router>
        <Navbar onSearch={this.handleSearch} onCategoryChange={this.handleCategoryChange} />
        <LoadingBar
          color="red"
          progress={this.state.progress}
          height={3}
          transitionTime={1000}
          loadingSpeed={1000}
          waitingTime={1000}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                apiKey={apiKey}
                setProgress={this.handleProgress}
                key="general"
                category="general"
                pageSize={this.props.pageSize}
                searchTerm={this.state.searchTerm}
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                apiKey={apiKey}
                setProgress={this.handleProgress}
                key="science"
                category="science"
                pageSize={this.props.pageSize}
                searchTerm={this.state.searchTerm}
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                apiKey={apiKey}
                setProgress={this.handleProgress}
                key="business"
                category="business"
                pageSize={this.props.pageSize}
                searchTerm={this.state.searchTerm}
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                apiKey={apiKey}
                setProgress={this.handleProgress}
                key="sports"
                category="sports"
                pageSize={this.props.pageSize}
                searchTerm={this.state.searchTerm}
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                apiKey={apiKey}
                setProgress={this.handleProgress}
                key="entertainment"
                category="entertainment"
                pageSize={this.props.pageSize}
                searchTerm={this.state.searchTerm}
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                apiKey={apiKey}
                setProgress={this.handleProgress}
                key="health"
                category="health"
                pageSize={this.props.pageSize}
                searchTerm={this.state.searchTerm}
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                apiKey={apiKey}
                setProgress={this.handleProgress}
                key="technology"
                category="technology"
                pageSize={this.props.pageSize}
                searchTerm={this.state.searchTerm}
              />
            }
          />
        </Routes>
      </Router>
    );
  }
}
