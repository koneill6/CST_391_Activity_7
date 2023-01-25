import React from "react";
import "./Post.css";

class Post extends React.Component
{
    state = { }

    handleDelete = () => {
        console.log("Delete = ", this.props.id);
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <div className="post-container">
                <span> Blog entry # {this.props.id}</span>
                <p>{this.props.text}</p>
                <button onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }
}

export default Post;