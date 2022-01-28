class Api::CommunitiesController < ApplicationController

  def index
    @communities = Community.joins('LEFT OUTER JOIN follows ON follows.community_id = communities.id').group('communities.id').order('COUNT(follows.id) DESC')
    # @communities = Community.all
    render :index
  end

  def followed
    @communities = Community.joins(:follows).where('follows.user_id = :currentUserId', { currentUserId: current_user.id })
    render :index
  end

  def moderator
    @communities = Community.where(creator_id: current_user.id)
    render :index
  end

  def show
    @community = Community.find_by(sub: params[:id])
    if @community
      render :show
    else
      render json: @community.errors.full_messages, status: 404
    end
  end

  def create
    @community = Community.new(community_params)
    # @community.creator_id = current_user.id
    if @community.save
      render :show
    else
      render json: @community.errors.full_messages, status: 400
    end
  end

  def update
    @community = Community.find_by(sub: params[:id])
    if @community.update(community_params)
      render :show
    else
      render json: @community.errors.full_messages, status: 404
    end
  end

  def destroy
    @community = Community.find_by(sub: params[:id])
    if current_user.id == @community.creator_id
      @community.delete
      render :show
    else
      render json: ['Only creator can delete community'], status: 400
    end
  end

  private
  def community_params
    params.require(:community).permit(:sub, :about, :icon, :creator_id, :color)
  end
end