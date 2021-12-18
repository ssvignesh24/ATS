class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.references :account, null: false, foreign_key: { to_table: :accounts, name: :users_account_id_fkey }
      t.string :user_locale, null: false
      t.string :user_tz, null: false
      t.text :invitation_token
      t.datetime :invitation_accepted_at
      t.bigint :invited_by_id
      t.datetime :invited_at
      t.boolean :admin_user, null: false
      t.boolean :power_user, null: false
      t.boolean :active, null: false
      t.boolean :deleted, null: false

      t.index :invitation_token, unique: true

      t.timestamps
    end
  end
end
