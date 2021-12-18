class CreateJoinTableJobsLocations < ActiveRecord::Migration[6.1]
  def change
    create_join_table :jobs, :locations do |t|
      t.index [:job_id, :location_id]
      # t.index [:location_id, :job_id]
    end
  end
end
