require 'rails_helper'

RSpec.describe "AccountInvites", type: :request do
  describe "GET /create" do
    it "returns http success" do
      get "/account_invites/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /accept" do
    it "returns http success" do
      get "/account_invites/accept"
      expect(response).to have_http_status(:success)
    end
  end

end
