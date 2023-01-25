import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import SearchForm from "./SearchForm";
import AlbumList from "./AlbumList";
import NavBar from "./NavBar";
import NewAlbum from "./NewAlbum";
import OneAlbum from "./OneAlbum";
import EditAlbum from "./EditAlbum";
import "./App.css";
import dataSource from "./dataSource";

const history = createBrowserHistory({basename: '.'});

class App extends React.Component
{
      state = { albumList: [ ], searchPhrase: "", currentlySelectedalbumId: -1, loading: true}

     componentDidMount()
     {
          this.loadAlbums();
     }

     loadAlbums = async () =>
     {
          this.setState( { loading: true} );
          const response = await dataSource.get('/albums');
          this.setState( { loading: false} );
          this.setState( { albumList: response.data} );
     }

     updateSearchResults = async (phrase) =>
     {
          console.log("phrase is " + phrase);
          this.setState( {searchPhrase: phrase});
          const response = await dataSource.get('/albums/search/description/' + phrase);
          this.setState( {albumList: response.data} );
     }

     updateSingleAlbum = (id) =>
     {
          console.log("Update Single Album = ", id);
          var indexNumber = 0;
          for(var i=0;i < this.state.albumList.length;++i)
          {
               if(this.state.albumList[i].id === id)
                    indexNumber = i;
          }
          this.setState( {currentlySelectedalbumId: indexNumber},
               console.log("This is it " + indexNumber),
               history.push("/show/" + indexNumber)
          );
     }

     editAlbum = (albumId) => 
     {
          console.log("App Edit currentlySelectedalbumId is ", albumId);
          var indexNumber = 0;
          for(var i=0;i < this.state.albumList.length;++i)
          {
               if(this.state.albumList[i].id === albumId)
                    indexNumber = i;
          }
          this.setState({currentlySelectedalbumId: indexNumber},
               history.push('/edit/' + indexNumber),
               console.log("State is ", this.state));
     }

     cancelNewAlbum = () =>
     {
          history.push('/');
          console.log("Cancelling New Album");          
     }

     cancelEditlbum = () =>
     {
          history.push('/');
          console.log("Cancelling Edit Album");          
     }

     cancelDisplaylbum = () =>
     {
          history.push('/');
          console.log("Cancelling Display Album");          
     }

     render()
     {
          return (
               <Router history={history}>
                    <div>
                         <NavBar />
                         <Switch>
                              <Route exact path="/" render ={ () => {
                                   if(this.state.loading)
                                   {
                                        return (
                                             <div className="container" align="center">
                                                  <h5>Please wait……loading</h5>
                                             </div>
                                        )
                                   }
                                   else
                                   {
                                        return (
                                             <div className="container">
                                                  <SearchForm onSubmit={this.updateSearchResults} />
                                                  <AlbumList albumList={this.state.albumList} onClick={this.updateSingleAlbum} onEditAlbum={this.editAlbum} />
                                             </div> 
                                        
                                        )
                                   }}
                              } />
                         </Switch>
                         <Route exact path="/new" render = {
                             () => <NewAlbum onCancel={this.cancelNewAlbum}/>
                         } />
                         <Route exact path="/show/:albumId" render = {
                              () => <OneAlbum album={this.state.albumList[this.state.currentlySelectedalbumId]} onCancel={this.cancelDisplaylbum}/>
                         } />
                         <Route exact path="/edit/:albumId" render = {
                              () => <EditAlbum album={this.state.albumList[this.state.currentlySelectedalbumId]} onCancel={this.cancelEditlbum}/>
                         } />
                     </div>
               </Router> )

     }
}

export default App;
