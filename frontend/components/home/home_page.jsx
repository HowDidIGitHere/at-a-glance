import React from "react";
import HomeDescContainer from "../home_description/home_desc_container";
import FooterCard from "../sidebar/footer_card";
import CreatePostCardContainer from "../create_post/create_post_card_container";
import PostCard from "../post_card/post_card";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    }
  }

  componentDidMount() {
    this.props.getPersonalFeed();
    window.onscroll = (e) => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.setState({ page: this.state.page + 1 }, () => this.props.getEvenMoreFeedPosts(this.state.page).then(() => console.log(this.state.page)))
      }
    }
  }

  render() {
    return (
      <div className='community-content'>
        <div className='main-community-page'>
          {this.props.currentUserId ? <CreatePostCardContainer /> : null}
          {
            this.props.personalFeed ? (
              <ul>
                {
                  this.props.personalFeed.map((post, idx) => (
                    <PostCard key={`post-personal-${idx}`} history={this.props.history} community={post.community} post={post} />
                  ))
                }
              </ul>
            ) : null
          }
        </div>
        <div className='sidebar-community-page'>
          {/* <CommunityAbout community={this.props.community}/> */}
          {/* <ModeratorsCard community={this.props.community} /> */}
          {/* {this.props.currentUserId ? <HomeDescContainer /> : null} */}
          <HomeDescContainer /> 
          <FooterCard />
        </div>
      </div>
    )
  }
}

export default HomePage;