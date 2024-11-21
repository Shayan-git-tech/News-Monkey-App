import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div>
        <div className="card">
          <div className="position-relative">
            <img
              src={
                !imageUrl
                  ? "https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2024/11/0/0/trump-election-win-getty.jpg?ve=1&tl=1"
                  : imageUrl
              }
              className="card-img-top"
              style={{ objectFit: "cover", aspectRatio: 16 / 9 }}
              alt="..."
            />
            <p className="position-absolute bottom-0 start-0 m-2 badge bg-danger">
              {source}
            </p>
          </div>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on {new Date(date).toLocaleDateString()}
              </small>
            </p>
            <br />
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-secondary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
