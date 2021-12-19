class Job < ApplicationRecord
  EMPLOYMENT_TYPE = Constants.new(:FULL_TIME, :PART_TIME, :INTERN, :CONTRACTOR)

  belongs_to :account
  belongs_to :team
  belongs_to :created_by, class_name: "User"
  has_and_belongs_to_many :locations
  has_many :job_skills
  has_many :skills, through: :job_skills
  has_rich_text :description

  before_create :set_slug

  # scope :active, -> { where(active: true, deleted: false) }

  def employment_type_text
    case employment_type
    when 'fulltime' then "Full-time"
    when 'parttime' then 'Part-time'
    when 'intern' then "Internship"
    when "contract" then "Contractor"
    end
  end

  def experience_text
    if max_experience_in_years.nil?
      min_experience_in_years.zero? ? "Fresher" : "#{min_experience_in_years}+ years of experience"
    else
      min = min_experience_in_years.zero? ? "Fresher" : min_experience_in_years
      "#{min} to #{max_experience_in_years} years of experience"
    end
  end

  private

  def set_slug
    self.slug = title
    self.slug += ("-" + employment_type)
    self.slug += "-#{team.name}"
    self.slug += "-#{account.name}-"
    # location = locations.first
    # self.slug += "-#{[location.city, location.state].join("-").downcase.tr(" ", "-")}"
    self.slug += SecureRandom.hex(6)
    self.slug = self.slug.downcase.gsub(" ", "-")
  end

end
