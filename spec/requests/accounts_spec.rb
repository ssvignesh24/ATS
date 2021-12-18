require 'rails_helper'

RSpec.describe "Accounts", type: :request do
  describe "GET /create" do
    it "returns http success" do
      get "/accounts/create"
      expect(response).to have_http_status(:success)
    end
  end

end
