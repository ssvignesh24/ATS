class Account < ApplicationRecord
  DEFAULT_TIMEZONE = "Asia/Kolkata"
  DEFAULT_LOCALE = "en"
  
  has_many :users

end
