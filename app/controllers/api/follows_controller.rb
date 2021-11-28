class Api::FollowsController < ApplicationController

  def create
    @follow = Follow.new(follow_params)
    @follow.user_id = current_user.id
    if @follow.save
      @community = @follow.community
      render 'api/community/show'
    else
      render json: @follow.errors.full_messages, status: 401
    end
  end

  def delete
    @follow = Follow.find_by(user_id: current_user.id, community_id: params[:follow][:community_id])
    @follow.delete
    @community = @follow.community
    render 'api/community/show'
  end

  private
  def follow_params
    params.require(:follow).permit(:community_id)
  end

end