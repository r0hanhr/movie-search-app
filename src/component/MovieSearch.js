import React, { Component } from "react";

export default class MovieSearch extends Component {
  state = {
    movie: "",
    result: [],
  };
  handleChange = e => {
    this.setState({ movie: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const imdbAPi = `http://www.omdbapi.com/?s=${this.state.movie}&apikey=f056e2f7`;
    fetch(imdbAPi)
      .then(data =>
        data
          .json()
          .then(movieData => {
            let movies = movieData.Search;
            this.setState({ result: movies });
            console.log(this.state.result);
          })
          .catch(err => console.log(err))
      )
      .catch(err => console.log(err));
  };
  render() {
    return (
      <>
        <nav className="navbar navbar-dark bg-info">
          <div className="container-fluid  justify-content-center">
            <form className="d-flex col-md-6" onSubmit={this.handleSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for movies"
                aria-label="Search"
                onChange={this.handleChange}
              />
              <button
                className="btn btn-outline-light ml-2 pl-4 pr-4"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
        {this.state.result === null || this.state.movie === null ? (
          <div>Please search movies</div>
        ) : (
          <>
            <div className="container mx-auto row m-4">
              {this.state.result.map(movie => {
                return (
                  <>
                    <div key={movie.imdbID} className="col-3 shadow p-3 mb-5">
                      <div className="card">
                        <img
                          src={movie.Poster}
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <h5 className="card-title text-info">
                            {movie.Title}
                          </h5>
                          <p className="card-text text-primary">{movie.Year}</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
      </>
    );
  }
}
