class AddPriorityToUserTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :user_tasks, :priority, :boolean, required: true, default: false
  end
end
