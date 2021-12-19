show_all ||= false

json.(job, :id, :title, :summary)
json.team do
  json.(job.team, :id, :name)
end
json.locations job.locations do |location|
  json.text location.as_text
  json.(location, :city, :state, :country)
end