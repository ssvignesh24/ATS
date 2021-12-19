json.status true
json.job do
  json.partial! "jobs/job", job: @job
end