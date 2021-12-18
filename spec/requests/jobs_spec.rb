require 'rails_helper'

RSpec.describe "Jobs", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/jobs/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/jobs/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/jobs/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/jobs/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/jobs/destroy"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /activate" do
    it "returns http success" do
      get "/jobs/activate"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /deactivate" do
    it "returns http success" do
      get "/jobs/deactivate"
      expect(response).to have_http_status(:success)
    end
  end

end
