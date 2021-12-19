class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  def after_sign_in_path_for(resource)
    "/dashboard"
  end

  def current_account
    current_user&.account
  end

  helper_method :current_account
  
end
