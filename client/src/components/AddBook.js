import React from 'react';
import {graphql} from 'react-apollo';
import {getAuthorsQuery,addBookMutation, getBooksQuery} from '../queries/queries';
import {flowRight} from 'lodash';
class AddBook extends React.Component{
    state = {
        name:"",
        genre:"",
        authorId:""
    }
    displayAuthors = ()=>{
        const data = this.props.getAuthorsQuery;
        if(data.loading){
            return(<option disabled>Loading Authors...</option>);
        }else{
            return data.authors.map((author,index)=>{
                return (<option key={index} value={author.id}>{author.name}</option>)
            })
        }
    }
    handleChange=e=>{
        this.setState({[e.target.name]:e.target.value});
    }

    submitForm = (e)=>{
        const {name,genre,authorId} = this.state;
        e.preventDefault();
        console.log(this.state);
        this.props.addBookMutation({
            variables:{
                name,genre,authorId
            },
            refetchQueries:[{
                query:getBooksQuery
            }]
        });
    }
    render(){
        return(
                <div>
                    <form id='add-book' onSubmit={this.submitForm}>
                        <div className='field'>
                            <label>Book name:</label>
                            <input type="text" name='name' value={this.state.name} onChange={this.handleChange}/>
                        </div>
                        <div className='field'>
                            <label>Genre:</label>
                            <input type="text" name='genre' value={this.state.genre} onChange={this.handleChange}/>
                        </div>
                        <div className='field'>
                            <label>Author:</label>
                            <select name='authorId' onChange = {this.handleChange}>
                                <option>Select author</option>
                                {this.displayAuthors()}
                            </select>
                        </div>
                        <button>+</button>
                    </form>
                    
                </div>
        )
    }
}

export default flowRight(graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
                       graphql(addBookMutation,{name:"addBookMutation"})) (AddBook);