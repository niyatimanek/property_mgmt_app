class SetIsApprovedDefaultToNilForProperties < ActiveRecord::Migration[6.1]
  def change
    change_column :properties, :is_approved, :boolean, :default => nil
  end
end
