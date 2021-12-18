Rails.application.routes.draw do
  devise_for :users

  root to: 'home#index'

  post "signup" => 'account_invites#create'
  get "invitation/accept" => 'account_invites#accept'
  post "invitation/accept" => 'accounts#create'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
