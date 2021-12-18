json.status true
json.jobs @jobs, partial: 'jobs/job', as: :job
json.total_count @jobs.size