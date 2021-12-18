class JobsController < ApplicationController
  def index
    @jobs = current_user.account.jobs
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end

  def activate
  end

  def deactivate
  end

  private

  def job_params
    
  end
end
