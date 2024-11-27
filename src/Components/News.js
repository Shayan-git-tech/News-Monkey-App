import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
  capitalized = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [], // Initialize articles as an empty array
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalized(this.props.category)} - NewsMonkey`;
  }

  async fetchArticles(page) {
  this.setState({ loading: true });
  const { setProgress, apiKey, category, searchTerm } = this.props;
  setProgress(0);

  try {
    const query = searchTerm ? `q=${searchTerm}&` : "";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&${query}pageSize=${this.props.pageSize}&page=${page}&apiKey=${apiKey}`;
    console.log("API URL:", apiUrl);
    const response = await fetch(apiUrl);
    setProgress(30);
    const data = await response.json();
    setProgress(50);

    console.log(data);

    // Handle unexpected responses
    const articles = Array.isArray(data.articles) ? data.articles : [];

    this.setState((prevState) => ({
      articles: [...prevState.articles, ...articles],
      loading: false,
      totalResults: data.totalResults || 0,
    }));
    setProgress(100);
  } catch (error) {
    console.error("Error fetching the news:", error);
    this.setState({ loading: false });
  }
}


  componentDidMount() {
    this.fetchArticles(this.state.page);
  }

  fetchMoreData = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      () => this.fetchArticles(this.state.page)
    );
  };

  getFilteredArticles() {
    const { searchTerm } = this.props;
    const { articles } = this.state;

    if (!searchTerm) return articles;

    return articles.filter((article) =>
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  render() {
    const {articles, loading,totalResults } = this.state;
    const filteredArticles = this.getFilteredArticles();

    return (
      <div className="container my-5">
        <h1 className="text-center">News Monkey Top Headlines</h1>
        {loading && articles.length === 0 ? <Spinner /> :
          <InfiniteScroll
            dataLength={articles.length}
            next={this.fetchMoreData}
            hasMore={articles.length < totalResults} // Stop fetching when all articles are loaded
            loader={<Spinner />}
          >
          <div className="container">
          <div className="row my-5">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article,index) => (
                <div className="col-md-4"  key={`${article.url}-${index}`}>
                  <NewsItem
                    title={article.title ? article.title.slice(0, 30) + "..." : "Untitled"}
                      description={
                        article.description
                          ? article.description.slice(0, 100) + "..."
                          : "Description not available"
                      }
                    imageUrl={article.urlToImage}
                    newsUrl={article.url}
                    author={article.author}
                    date={article.publishedAt}
                    source={article.source.name}
                  />
                </div>
              ))
            ) : (
              <div className="text-center">
                <h3>No search results found.</h3>
                <p>Try a different search term or check back later for new updates.</p>
              </div>
            )}
          </div>
          </div>
        </InfiniteScroll>
        }
      </div>
    );
  }
}
