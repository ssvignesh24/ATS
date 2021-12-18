class CreateAccountInvites < ActiveRecord::Migration[6.1]
  def change
    create_table :account_invites do |t|
      t.string :email, null: false
      t.text :invitation_token, null: false
      t.datetime :invited_at, null: false
      t.datetime :invitation_accepted_at
      t.bigint :account_id, foreign_key: { to_table: :accounts, name: :account_invites_account_id_fkey }

      t.index :email, unique: true
      t.index :invitation_token, unique: true

      t.timestamps
    end
  end
end
