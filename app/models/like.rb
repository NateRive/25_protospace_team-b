class Like < ActiveRecord::Base

  belongs_to :user, :prototype

end
