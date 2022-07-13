import React, { Component } from "react";
import httpService from "./services/httpService"; // Hidden axios behind this http module.
import {ToastContainer} from "react-toastify";
import config from "./config.json";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";







class App extends Component {
  state = {
    posts: []
  };


  // Whenever we use await keyword we decorate the componentDidMount method with async keyword.
  async componentDidMount() {

    //Promise can be pending or resolved(success) or else rejected(failure)
    const {data:posts} = await httpService.get(config.apiEndpoint); // Getting the data from the http request. 
    // data: posts is the response object coming from the server. So we used object destructuring. 
    //console.log(promise);

    // Now to get response from promise we use await keyword and store them in a const.
    //1- const response = await promise;
    //console.log(response);
    this.setState({ posts });

  }



  // Creating a data.
  handleAdd = async () => {
    const obj={title: 'a', body:'b'};
   const {data: post} = await httpService.post(config.apiEndpoint, obj);
   
   const posts=[post, ...this.state.posts];
   this.setState({posts});

  };

  handleUpdate = async post => {
    post.title = "UPDATED!"
     await httpService.put(config.apiEndpoint + '/' + post.id, post );

    const posts=[...this.state.posts];
    const index =posts.indexOf(post);
    posts[index]= {...post};
    this.setState({posts});


     //console.log(data);


  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;

    // Implemented Optimistic Update to the UI.
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({posts});

   

      try{
        await httpService.delete( "s" + config.apiEndpoint + "/" + post.id);
        throw new Error("");
        
      } catch (ex) {

        console.log("Handle  Catch Block.");
        if(ex.response && ex.response.status === 404)
        alert("This post is already been deleted.");
       
      this.setState( {posts: originalPosts});
      }
  };

  render() {

    return (
      <React.Fragment>
        <ToastContainer position="top-right"/>
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
