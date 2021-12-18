class Job < ApplicationRecord
  belongs_to :account
  belongs_to :team
  has_and_belongs_to_many :locations
  has_many :job_skills
  has_many :skills, through: :job_skills

end
