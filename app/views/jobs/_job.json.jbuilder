show_all ||= false

json.(job, :id, :title, :summary, :slug, :description)
json.employmentTypeText job.employment_type_text
json.experienceText job.experience_text
json.team do
  json.(job.team, :id, :name)
end
json.locations job.locations do |location|
  json.text location.as_text
  json.(location, :city, :state, :country)
end