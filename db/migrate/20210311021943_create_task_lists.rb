class CreateTaskLists < ActiveRecord::Migration[6.0]
  def change
    create_table :task_lists do |t|
      t.string :name
      t.string :emoji

      t.timestamps
    end
  end
end
