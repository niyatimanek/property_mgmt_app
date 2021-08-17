class Property < ApplicationRecord
	default_scope { where(:is_active => true) }
	belongs_to :user, :foreign_key => 'admin_id'
end
