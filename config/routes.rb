Rails.application.routes.draw do
  get 'dashboard', to: 'dashboard#home', as: 'dashboard'
  devise_for :users
  root to: 'pages#home'
  resources :tasks do
    member do
      patch :toggle
    end
    resources :user_tasks, only: [ :create ]
  end
  resources :user_tasks, only: [ :show, :destroy ] do
    member do
      patch '/user_position', to: 'user_tasks#change_user_position', as: 'user_position'
    end
  end
  resources :profiles, only: [:show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
