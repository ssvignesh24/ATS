class TeamsController < ApplicationController
  def index
    @teams = current_account.teams
  end

  def create
  end

  def update
  end
end
