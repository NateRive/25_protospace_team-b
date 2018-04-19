class PrototypesController < ApplicationController
  before_action :set_prototype, only: :show

  def index
    @prototypes = Prototype.order("created_at DESC").page(params[:page]).per(10)
  end

  def new
    @prototype = Prototype.new
    @prototype.captured_images.build
  end

  def create
    @prototype = Prototype.new(prototype_params)
    if @prototype.save
      redirect_to :root, notice: 'New prototype was successfully created'
    else
      redirect_to :new_prototype, alert: 'YNew prototype was unsuccessfully created'
     end
  end

  def show
    @like = Like.find_by("user_id = ? and prototype_id = ?", current_user.id, params[:id])
    if @like.present?
      @like_id = @like.id
      @like = true
    else
      @like = false
    end
    @likes_number = Like.where(prototype_id: params[:id]).count
    @comments = Comment.order('created_at Asc')
    @comment = Comment.new
  end

  def destroy
    @prototype = Prototype.find(params[:id])
    @prototype.destroy if @prototype.user_id == current_user.id
  end

  private

  def set_prototype
    @prototype = Prototype.find(params[:id])
  end

  def prototype_params
    params.require(:prototype).permit(
      :title,
      :catch_copy,
      :concept,
      :user_id,
      captured_images_attributes: [:content, :status]
    )
  end
end
