class CreateJobSkills < ActiveRecord::Migration[6.1]
  def change
    create_table :job_skills do |t|
      t.references :job, null: false, foreign_key: { to_table: :jobs, name: :job_skills_job_id_fkey }
      t.references :skill, null: false, foreign_key: { to_table: :skills, name: :job_skills_skill_id_fkey }

      t.index [:job_id, :skill_id], unique: true

      t.timestamps
    end
  end
end
