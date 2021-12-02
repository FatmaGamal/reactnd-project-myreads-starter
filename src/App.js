import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import { Link, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Shelf from './Shelf'
import Search from './Search'
import NoMatch from './NoMatch'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchQuery: '',
    searchResults: []
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books })
  }

  updateQuery = async (q) => {
    this.setState({searchQuery: q});
    if (!q) {
      this.setState({searchResults: []})
    } else {
      const searchResults = await BooksAPI.search(q);
      if (!searchResults.error && searchResults.length) {
        searchResults.map((result) => {
          this.state.books.find((book) => {
            if (book.id === result.id && book.shelf) {
              result.shelf = book.shelf
            }
          })
        })
        this.setState({ searchResults });
      } else {
        this.setState({searchResults: []});
      }
    }
  }

  updateBookState = async (bookToUpdate, newState) => {
    let value = newState.target.value;
    if (this.state.books.find((book) => (book.id === bookToUpdate.id))) {
      // just updating state
      await BooksAPI.update(bookToUpdate, value);
      if (value == 'none') {
        this.setState({
          books: this.state.books.filter((book) => book.id !== bookToUpdate.id)
        });
      } else {
        this.setState({
          books: this.state.books.map((book) => {
            if (book.id === bookToUpdate.id) {
              book.shelf = value;
            }
            return book;
          })
        });
      }
    } else {
      // new book
      await BooksAPI.update(bookToUpdate, value);
      this.setState(prevState => ({
        ...prevState,
        books: [...prevState.books, { ...bookToUpdate, shelf: value }]
      }));
    }
  }

  render() {
    const {books, searchQuery, searchResults} = this.state;
    return (
      <div className="app">
        <Switch>
          <Route path='/' exact render={() => (
            <div>
            <Header />
            <div className="body-container">
              <Shelf books={books} mode="show" query={searchQuery} updateBookState={this.updateBookState}/>
              <div className="open-search">
                <Link to='/search' >Add a book</Link>
              </div>
            </div>
            </div>
          )} />
          <Route path='/search' render={() => (
            <div>
              <Search query={searchQuery} updateQuery={this.updateQuery}/>
              <div className="body-container">
                <Shelf books={books} mode="search" updateBookState={this.updateBookState} searchResults={searchResults} />
                </div>
            </div>
          )} />
          <Route path='*' render={() => (
            <Header>
              <NoMatch />
              </Header>
          )} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
