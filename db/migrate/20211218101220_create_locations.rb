class CreateLocations < ActiveRecord::Migration[6.1]
  def change
    create_table :locations do |t|
      t.string :city, null: false
      t.string :state, null: false
      t.string :country, null: false
      t.string :google_place_id

      t.index [:city, :state, :country], unique: true

      t.timestamps
    end
  end
end
