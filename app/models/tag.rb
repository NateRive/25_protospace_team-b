class Tag < ActiveRecord::Base

  has_many :prototypes, through: :prototype_tag

end
