import React from "react";
import Post from "./Post";
import AddPost from "./AddPost";

class App extends React.Component
{
    state = {
        nextIDNumber: 3,
        posts: [
            {
                postNumber: 0,
                text: "A very interesting blog post about nothing."
            },
            {
                postNumber: 1,
                text: "Another very interesting blog post about nothing."
            },
            {
                postNumber: 2,
                text: "Yet a third very interesting blog post about nothing."
            }
        ]
    }

    deleteBlogPost = (toBeDeleted) =>
    {
        console.log("Current Blog List = ", this.state.posts);
        var postToDelete = this.state.posts.filter((post) => {
            console.log(post.postNumber, toBeDeleted);
            return post.postNumber === toBeDeleted;
        });
        console.log("Going to delete Blog Post = ", postToDelete);
        this.setState({ posts: this.state.posts.filter((post) => {
            return post !== postToDelete[0]
        })});
    }

    addNewPost = (t) => {
        console.log("Creating new Post with text of ", t);
        this.setState( {nextIDNumber: this.state.nextIDNumber + 1});
        var newPost = {
            postNumber: this.state.nextIDNumber,
            text: t
        }
        var newArray = this.state.posts.concat(newPost);
        this.setState({posts: newArray});
    }

    render() {
        const posts = this.state.posts.map(
            (onepost) => { return <Post key={onepost.postNumber} text={onepost.text} id={onepost.postNumber} onClick={this.deleteBlogPost} />}
        )
        return (<div>
                    <AddPost onClick={this.addNewPost}/>
                    {posts}
                </div>
        )
    }
}

export default App;