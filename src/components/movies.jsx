import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import ListGroup from './common/listgroup';
import Pagination from './common/pagination';
import {getMovies} from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreService';
import { paginate } from  '../utility/paginate';
import _ from 'lodash';


class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: 'titel', order: 'asc'}
    };

    componentDidMount() {
        const genres = [{ _id: "", name: "All Geners" }, ...getGenres() ]
        this.setState({ movies: getMovies(), genres })
    };

    handelDelete = movie => {
     const movies= this.state.movies.filter(m => m._id !== movie._id);
     this.setState({ movies });
    };

    handelLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked= !movies[index].liked;
        this.setState({ movies });
    };

    handelPageChange = page => {
        this.setState({ currentPage : page});
    };

    handelGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage:1 });
    };

    handelSort = sortColumn => {
      this.setState({ sortColumn });
    };
    
    getPagedData = () => {
        const { pageSize, 
            currentPage, 
            selectedGenre,
            sortColumn, 
            movies: allMovies } = this.state;


        const filtered = selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id ===selectedGenre._id) 
        : allMovies;

      const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);  

      const movies = paginate(sorted, currentPage, pageSize);

      return { totalCount: filtered.length, data: movies };
    };

    
    render(){
        const { length: count } = this.state.movies;
        const { pageSize, 
                currentPage,
                sortColumn
              } = this.state;

        if (count === 0) return <p>There are no movies in the database.</p>;

        const { totalCount, data:movies } = this.getPagedData();

        return(
            <div className="row">
                <div className="col-3">
                    <ListGroup 
                     items={this.state.genres}
                     selectedItem={this.state.selectedGenre}
                     onItemSelect={this.handelGenreSelect}/>
                </div>
                <div className="col">
                <p>Showing {totalCount} movies in the database. </p>
                <MoviesTable 
                  movies={movies}
                  sortColumn={sortColumn} 
                  onLike={this.handelLike} 
                  onDelete={this.handelDelete}
                  onSort={this.handelSort}  />
            
    {/* page component */}
    <Pagination 
    itemCount={totalCount}
    pageSize={pageSize} 
    currentPage={currentPage}
    onPageChange={this.handelPageChange} />
                </div>
            </div>
            
        );

    }
}

export default  Movies;