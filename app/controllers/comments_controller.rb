class CommentsController < ApplicationController

  def create
    @comment = Comment.create(comment_params)
    redirect_to prototype_path(id: current_user.id)
  end

  private

  def comment_params
    params.require(:comment).permit(:content).merge(prototype_id: params[:prototype_id], user_id: current_user.id)
  end

end
