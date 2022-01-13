class Api::VotesController < ApplicationController

  # Need to work on
  def index
    @votes = Vote.where(user_id: current_user.id)
    render :index
  end

  def create
    @vote = Vote.new(vote_params)
    @vote.user_id = current_user.id
    if @vote.save
      currPage = params[:vote][:parent_type]
      if currPage == 'Post'
        currPage = 'post'
        @post = Post.find(params[:vote][:parent_id])
        if params[:vote][:upvote]
          @post.vote_count += 1
        else
          @post.vote_count -= 1
        end
      elsif currPage == 'Comment'
        currPage = 'comment'
        @comment = Comment.find(params[:vote][:parent_id])
        if params[:vote][:upvote]
          @comment.vote_count += 1
        else
          @comment.vote_count -= 1
        end
      end
      render 'api/' + currPage + 's/show'
    else
      render json: @vote.errors.full_messages, status:401
    end
  end

  def destroy
    @vote = Vote.find_by(user_id: current_user.id, parent_id: params[:vote][:parent_id], parent_type: params[:vote][:parent_type])
    @vote.delete
    currPage = params[:vote][:parent_type] # Will say 'api/posts/show' or 'api/comments/show'
    if currPage == 'Post'
      currPage = 'post'
      @post = Post.find(@vote.parent_id)
      if @vote.upvote
        @post.vote_count -= 1;
      else
        @post.vote_count += 1;
      end
    elsif currPage == 'Comment'
      currPage = 'comment'
      @comment = Comment.find(@vote.parent_id)
      if @vote.upvote
        @comment.vote_count += 1;
      else
        @comment.vote_count -= 1;
      end
    end
    render 'api/' + currPage + 's/show'
  end

  private
  def vote_params
    params.require(:vote).permit(:upvote, :parent_id, :parent_type)
  end

end