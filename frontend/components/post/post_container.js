import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getCommunity } from "../../actions/community_actions";
import { getCurrentPost } from "../../actions/post_actions";
import Post from "./post";

const mapStateToProps = (state, ownProps) => ({
  currentUserId: state.session.currentUserId,
  community: state.entities.communities[ownProps.match.params.communityTitle],
  currentPost: state.entities.currentPost,
  // comments: Object.values(state.entities.comments)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getCommunity: () => dispatch(getCommunity(ownProps.match.params.communityTitle)),
  getCurrentPost: () => dispatch(getCurrentPost(ownProps.match.params.postId)),
  // getAllComments: () => dispatch(getAllComments(ownProps.match.params.postId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));