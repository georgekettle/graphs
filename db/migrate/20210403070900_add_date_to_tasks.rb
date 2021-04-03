class AddDateToTasks < ActiveRecord::Migration[6.0]
  def change
    remove_column :tasks, :start, :datetime
    remove_column :tasks, :end, :datetime
    add_column :tasks, :start_date, :date
    add_column :tasks, :end_date, :date
    add_column :tasks, :start_time, :time
    add_column :tasks, :end_time, :time
  end
end
