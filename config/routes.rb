Rails.application.routes.draw do
  devise_for :users

  root to: 'home#index'

  post "signup" => 'account_invites#create'
  get "invitation/accept" => 'account_invites#accept'
  post "invitation/accept" => 'accounts#create'

  constraints lambda { |req| req.format == :html } do
    get "/job/:slug" => "jobs#page"
  end

  constraints lambda { |req| req.format == :json } do
    get '/timezones' => "application#available_timezones"
    get '/job/:slug' => "jobs#details"
    
    resources :teams, only: [:index, :create, :update]
    resources :jobs, only: [:create, :index, :show, :update, :destroy], param: :job_id do
      member do
        post "activate"
        post "deactivate"
      end
    end

  end

  constraints lambda { |req| req.format == :html && !req.path.starts_with?("/rails/active_storage") && !req.path.starts_with?("/power")} do
    get '*path' => 'main#index'
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
