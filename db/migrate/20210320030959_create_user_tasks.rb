class CreateUserTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :user_tasks do |t|
      t.references :user, null: false, foreign_key: true
      t.references :task, null: false, foreign_key: true
      t.references :task_list, null: false, foreign_key: true
      t.integer :task_list_position
      t.integer :user_position

      t.timestamps
    end
  end
end
