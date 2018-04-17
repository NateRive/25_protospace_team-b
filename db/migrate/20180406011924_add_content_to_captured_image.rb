class AddContentToCapturedImage < ActiveRecord::Migration
  def self.up
    change_table :captured_images do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :captured_images , :image
  end
end
