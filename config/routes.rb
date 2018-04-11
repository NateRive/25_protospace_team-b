Rails.application.routes.draw do
  devise_for :users
  root 'prototypes#index'

  resources :prototypes, only: [:index, :new, :create, :show] do
    resources :comments, only: [:create, :edit, :destroy, :update]
  end
  resources :users, only: [:show, :edit, :update]
end
