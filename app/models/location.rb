class Location < ApplicationRecord
  has_and_belongs_to_many :jobs
  
  def as_text
    [city, state, country].join(", ")
  end
end
