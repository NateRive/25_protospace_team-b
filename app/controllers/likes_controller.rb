class LikesController < ApplicationController


  def create
    @like = Like.new(user_id: current_user.id, prototype_id: params[:prototype_id])
    if @like.save
      respond_to do |format|
        format.json
        format.html
      end
    end
  end

  def destroy
    Like.find(params[:id]).destroy
    respond_to do |format|
      format.json { head :no_content }
      format.html
    end
  end
# { @likes_number = Likes.where(group_id: params[:prototype_id]).count }

end
