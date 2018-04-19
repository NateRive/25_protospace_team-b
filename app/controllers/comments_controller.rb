class CommentsController < ApplicationController
  before_action :set_comment, only: [:edit, :update, :destroy]

  def create

    @comment = Comment.create(comment_params)
    binding.pry
    @group = Prototype.find(params[:prototype_id])

    respond_to do |format|
      format.html { redirect_to prototype_path(@group)  }
      format.json
    end
  end

  def edit
    respond_to do |format|
    format.html { redirect_to prototype_path(id: current_user.id)  }
    format.json
    end
  end

  def update
    @comment.update(comment_params) if @comment.user_id == current_user.id
    respond_to do |format|
    format.html { redirect_to prototype_path(id: current_user.id)  }
    format.json
    end
  end

  def destroy
    @comment.destroy if @comment.user.id == current_user.id
    respond_to do |format|
    format.html { redirect_to prototype_path(id: current_user.id)  }
    format.json
    end
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.permit(:content).merge(prototype_id: params[:prototype_id], user_id: current_user.id)
  end

end
