class AddColorToTaskLists < ActiveRecord::Migration[6.0]
  def change
    add_column :task_lists, :color, :string
  end
end
