class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.boolean :completed
      t.datetime :start
      t.datetime :end

      t.timestamps
    end
  end
end
