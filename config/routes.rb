Rails.application.routes.draw do
  get 'dashboard', to: 'dashboard#home', as: 'dashboard'
  devise_for :users
  root to: 'pages#home'
  resources :tasks do
    member do
      patch :toggle
      get :members
    end
    resources :user_tasks, only: [ :new, :create ]
  end
  resources :user_tasks, only: [ :show, :destroy, :update ] do
    member do
      patch '/user_position', to: 'user_tasks#change_user_position', as: 'user_position'
      patch :toggle_priority
      get :select_task_list
    end
  end
  resources :profiles, only: [:show, :edit, :update] do
    collection do
      get :search
      get :select_search
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
