class CommentsController < ApplicationController

  def create
    @comment = Comment.create(comment_params)
      respond_to do |format|
      format.html { redirect_to prototype_path(id: current_user.id)  }
      format.json
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content).merge(prototype_id: params[:prototype_id], user_id: current_user.id)
  end

end
