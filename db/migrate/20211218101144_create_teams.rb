class CreateTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :teams do |t|
      t.references :account, null: false, foreign_key: { to_table: :accounts, name: :teams_account_id_fkey }
      t.string :name, null: false

      t.index :name, unique: true

      t.timestamps
    end
  end
end
