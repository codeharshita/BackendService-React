import React, { Component } from "react";
import axios from "axios";
import "./App.css";



const apiEndpoint= 'https://jsonplaceholder.typicode.com/posts';
class App extends Component {
  state = {
    posts: []
  };


  // Whenever we use await keyword we decorate the componentDidMount method with async keyword.
  async componentDidMount() {

    //Promise can be pending or resolved(success) or else rejected(failure)
    const {data:posts} = await axios.get(apiEndpoint); // Getting the data from the http request. 
    // data: posts is the response object coming from the server. So we used object destructuring. 
    //console.log(promise);

    // Now to get response from promise we use await keyword and store them in a const.
    //1- const response = await promise;
    //console.log(response);
    this.setState({posts});

  }



  // Creating a data.
  handleAdd = async () => {
    const obj={title: 'a', body:'b'};
   const {data: post} = await axios.post(apiEndpoint, obj);
   
   const posts=[post, ...this.state.posts];
   this.setState({posts});

  };

  handleUpdate = async post => {
    post.title="UPDATED!"
     await axios.put(apiEndpoint + '/' + post.id, post );

    const posts=[...this.state.posts];
    const index =posts.indexOf(post);
    posts[index]= {...post};
    this.setState({posts});


     //console.log(data);


  };

  handleDelete = async post => {
    await axios.delete(apiEndpoint + '/'+ post.id);


    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({posts});

  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
