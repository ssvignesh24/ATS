class CreateJobs < ActiveRecord::Migration[6.1]
  def change
    create_table :jobs do |t|
      t.references :account, null: false, foreign_key: { to_table: :accounts, name: :jobs_account_id_fkey }
      t.text :title, null: false
      t.bigint :created_by_id, null: false, foreign_key: { to_table: :users, name: :jobs_created_by_id_fkey }
      t.references :team, null: false, foreign_key: { to_table: :teams, name: :jobs_team_id_fkey }
      t.string :remote_type
      t.integer :open_positions
      t.decimal :min_experience_in_years, null: false
      t.decimal :max_experience_in_years
      t.string :employment_type, null: false
      t.jsonb :visibility_config, null: false
      t.text :degree_qualifications, array: true, null: false

      t.timestamps
    end
  end
end
