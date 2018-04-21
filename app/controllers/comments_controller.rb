class CommentsController < ApplicationController
  before_action :set_comment, only: [:edit, :update, :destroy]
  def create
    @comment = Comment.create(comment_params)
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
    @group = Prototype.find(params[:prototype_id])
    @comment.update(comment_params) if @comment.user_id == current_user.id
    respond_to do |format|
    format.html { redirect_to prototype_path(@group)  }
    format.json
    end
  end

  # def destroy
  #   @prototype = Prototype.find(params[:prototype_id])
  #   if @comment.user.id == current_user.id
  #     @comment.destroy
  #   end
  #   if @comment.destroy
  #     respond_to do |format|
  #     format.html { redirect_to prototype_path(@prototype)  }
  #     format.json { head :no_content }
  #     end
  #   else
  #     format.json
  #   end
  # end

  def destroy
    @prototype = Prototype.find(params[:prototype_id])
    if @comment.user.id == current_user.id
      @comment.destroy
      respond_to do |format|
      format.html { redirect_to prototype_path(@prototype)  }
      format.json { head :no_content }
      end
    else
      respond_to do |format|
        format.json
      end
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
