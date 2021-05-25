import React, {Component} from 'react';
import Table from './common/table';
import Like from './common/like';

class MoviesTable extends Component {
    columns = [
        { path: "titel", lable: "Titel"},
        { path: "genre.name", lable: "Genre"},
        { path: "numberInStock", lable: "Stock"},
        { path: "dailyRentalRate", lable: "Rate"},
        { 
            key: "like", 
            content: movie =>  
            <Like liked={movie.liked} onClick={() => this.props.onLike(movie) }></Like> 
        },
        { 
            key: "delete", 
            content: movie => (
            <button onClick={() => this.props.onDelete(movie)} 
            className="btn btn-primary btn-sm">
                Delete
            </button> )}
    ];
    

    render() { 
        const { movies, sortColumn, onSort } = this.props ;

        return (
            <Table 
              columns={this.columns} 
              data={movies} 
              sortColumn={sortColumn} 
              onSort={onSort} />
        );
    }
}
 
 
export default MoviesTable;