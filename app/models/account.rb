class Account < ApplicationRecord
  DEFAULT_TIMEZONE = "Asia/Kolkata"
  DEFAULT_LOCALE = "en"
  
  has_many :users
  has_many :teams
  has_many :locations
  has_many :jobs

end
