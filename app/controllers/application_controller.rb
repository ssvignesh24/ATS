class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  def after_sign_in_path_for(resource)
    "/dashboard"
  end

  def current_account
    current_user&.account
  end

  helper_method :current_account

  protected

  def as_api
    begin
      yield
    rescue ApiError::BadRequest => e
      render status: :bad_request, json: { status: false, error: e.message }
    rescue ApiError::NotFound => e
      render status: :not_found, json: { status: false, error: e.message }
    rescue ApiError::Forbidden => e
      render status: :forbidden, json: { status: false, error: e.message }
    rescue ApiError::InvalidParameters => e
      render status: :bad_request, json: { status: false, errors: e.errors }
    rescue => e
      ErrorReporter.send(e)
      render status: 500, json: { error: "Something went wrong, please try again"}
    end
  end
  
end
