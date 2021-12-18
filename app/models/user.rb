class User < ApplicationRecord
  # :confirmable, :registerable, and :omniauthable
  devise :database_authenticatable, :lockable, :timeoutable, :trackable,
         :recoverable, :rememberable, :validatable
  belongs_to :account
  
end
