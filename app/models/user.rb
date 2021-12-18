class User < ApplicationRecord
  # :confirmable, :registerable, and :omniauthable
  devise :database_authenticatable, :lockable, :timeoutable, :trackable,
         :recoverable, :rememberable, :validatable
  belongs_to :account
  
  has_one_attached :display_picture
  
  scope :active, -> { where(active: true, deleted: false) }

  def invitation_pending?
    return false unless invited_by_id.present?
    !self.invitation_accepted_at.present?
  end
  
end
