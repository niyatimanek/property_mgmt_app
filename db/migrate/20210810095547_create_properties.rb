class CreateProperties < ActiveRecord::Migration[6.1]
  def change
    create_table :properties do |t|
      t.string :name
      t.string :address
      t.string :city
      t.string :state
      t.integer :zipcode
      t.string :country
      t.boolean :is_approved, :default => false
      t.integer :admin_id
      t.integer :user_id
      t.boolean :is_active, :default => true
      t.timestamps
    end
  end
end
