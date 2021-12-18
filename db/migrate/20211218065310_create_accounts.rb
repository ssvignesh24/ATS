class CreateAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :accounts do |t|
      t.string :name, null: false
      t.string :account_locale, null: false
      t.string :account_tz, null: false
      t.boolean :power_account, null: false
      t.boolean :active, null: false

      t.timestamps
    end
  end
end
