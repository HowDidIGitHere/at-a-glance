import React from "react";
import { Route, Switch } from "react-router";
import NavContainer from "./navbar/nav_container";
import Modal from "./modal/modal";
import { Link } from "react-router-dom";
import CommunityPageContainer from "./community_page/community_page_container";
import CommunitiesListContainer from "./communities_list/communities_list_container";
import HomePageContainer from "../home/home_page_container";
import { ProtectedRoute } from "../util/route_utils";
import CreatePostContainer from "./create_post/create_post_container";
import SearchBarContainer from "./searchbar/searchbar_container";

const App = () => (
  <div>
    <Modal />
    <header>
      <Link to='/'>
        <h1 className='logo'>peroos</h1>
      </Link>
      <SearchBarContainer />
      <NavContainer />
    </header>
    <div className='hidden-buffer'></div>

    <main>
      <Switch>
        <ProtectedRoute path='/submit' component={props => <CreatePostContainer {...props} />} />
        <ProtectedRoute path='/:communityTitle/submit' component={props => <CreatePostContainer {...props} />} />
        <Route path='/communities' component={props => <CommunitiesListContainer {...props} />} />
        {/* <Route path='/:communityTitle/comments/:postId' component={props => < {...props} />} /> */}
        <Route path='/:communityTitle' component={props => <CommunityPageContainer {...props} />} />
        <Route path='/' component={props => <HomePageContainer {...props}/>} />
      </Switch>
    </main>

  </div>
)

export default App; 