import React, { Component } from "react";

//import PropTypes from 'prop-types'

class Shelf extends Component {
//TODO
/*  static propTypes = {
     books : this.PropTypes.arrayOf(this.PropTypes.Object).isRequired
 } */
        
    bookStates = {wantToRead: 'Want To Read', currentlyReading:'Currently Reading', read: 'Read'};

    state = {
        bookShelf: null,
    };

    filterBooks = (requiredState) => {
        const filtered = this.props.books.filter((book) => {
            return book.shelf === requiredState 
        })

        return filtered;
    }

    renderBooks = (books = this.props.searchResults) => {
        return books.map((book, index) => {
            return (<div key={index} className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (book.imageLinks ? `url("${book.imageLinks.thumbnail}")` : '') }}></div>
              <div className="book-shelf-changer">
                <select onChange={(e) => {this.props.updateBookState(book, e)}} value={book.shelf}>
                  <option value="move" disabled>Move to...</option>
                  <option value="none">None</option>
                  {Object.keys(this.bookStates).map((state) => {
                      return (<option value={state} key={state}>{this.bookStates[state]}</option>)
                  })}
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            {book.authors ? <div className="book-authors">{book.authors.join(', ')}</div>: null}
          </div>)
        })

    }

    componentDidMount() {
        if (this.props.mode === 'show' && this.props.books.length && !this.state.bookShelf ) {
            let currentShelf = this.state.bookShelf || {};
            for (var key in this.bookStates) {
                currentShelf[key] = this.filterBooks(key)
            }

            this.setState({ bookShelf: currentShelf});
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.mode === 'show' && this.props.books.length && (prevProps.books !== this.props.books || this.props.mode !== prevProps.mode)) {
            let currentShelf = this.state.bookShelf || {};
            for (var key in this.bookStates) {
                currentShelf[key] = this.filterBooks(key)
            }

            this.setState({ bookShelf: currentShelf});
        }
    }

    render() {
        const { mode } = this.props;

        return (
            <div>
            {(mode === 'show' && this.state.bookShelf) && (
                    <>
                        <div className="bookshelf-shelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-list">
                                {this.renderBooks(this.state.bookShelf['wantToRead'])}
                            </div>
                        </div>
                        <div className="bookshelf-shelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-list">
                                {this.renderBooks(this.state.bookShelf['currentlyReading'])}

                            </div>
                        </div>
                        <div className="bookshelf-shelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-list">
                                {this.renderBooks(this.state.bookShelf['read'])}
                            </div>
                        </div>
                    </>
            )}
            {mode === 'search' && (
                <div className="bookshelf-shelf">
                    <div className="bookshelf-list">
                        {this.renderBooks()}
                    </div>
                </div>
            )}
            </div>
        )
    }
}

export default Shelf;