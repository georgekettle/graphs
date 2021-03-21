class TaskList < ApplicationRecord
  has_many :user_tasks, dependent: :destroy
  has_many :tasks, through: :user_tasks

  def bg_color
    "#{self.color}26"
  end
end
