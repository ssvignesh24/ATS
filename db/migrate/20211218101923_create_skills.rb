class CreateSkills < ActiveRecord::Migration[6.1]
  def change
    create_table :skills do |t|
      t.string :name, null: false

      t.index :name, unique: true

      t.timestamps
    end
  end
end
