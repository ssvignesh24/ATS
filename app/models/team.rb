class Team < ApplicationRecord
  belongs_to :account
  has_many :jobs
  
end
