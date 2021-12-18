class AccountInvite < ApplicationRecord
  belongs_to :account, optional: true
end
