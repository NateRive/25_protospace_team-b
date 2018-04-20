class Tag < ActiveRecord::Base
  has_many :prototype_tags
  has_many :prototypes, through: :prototype_tag
end
