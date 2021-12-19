require 'rails_helper'

RSpec.describe "Teams", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/teams/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/teams/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/teams/update"
      expect(response).to have_http_status(:success)
    end
  end

end
