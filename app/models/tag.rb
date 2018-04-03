class Tag < ActiveRecord::Base

  has_many :prototype, through: :prototype_tag

end
