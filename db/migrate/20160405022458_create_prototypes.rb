class CreatePrototypes < ActiveRecord::Migration
  def change
    create_table :prototypes do |t|
      t.string :title
      t.string :catch_copy
      t.text   :concept
      t.references :user, null: false, foreign_key: true

      t.timestamps null: false
    end
  end
end
