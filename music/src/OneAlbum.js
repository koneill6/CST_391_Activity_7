import React from "react";

class OneAlbum extends React.Component
{
    handleCancel = (event) => {
        console.log("Canceling Display Album");
        this.props.onCancel();
    }

    render()
    {
        return (
            <div>
                <div align="center">
                <h2>Album Details</h2>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col col-sm-3">
                            <div className="card">
                                <img src={"../assets/images/" + this.props.album.image} className="card-img-top" alt={this.props.album.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{this.props.album.title}</h5>
                                    <p className="card-text" align="center">{this.props.album.year}</p>
                                    <p className="card-text">{this.props.album.description}</p>
                                    <div align="center">
                                        <button type="button" className="btn btn-light" onClick={this.handleCancel}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col col-sm-9">
                            <div className="card">
                                <p>Show the album's tracks here</p>
                            </div>
                            <div className="card">
                                <p>Show the lyrics of select track here</p>
                            </div>
                            <div className="card">
                                <p>Show the YouTube Video of select track here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OneAlbum;