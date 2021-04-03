class TaskList < ApplicationRecord
  belongs_to :user
  has_many :user_tasks, dependent: :destroy
  has_many :tasks, through: :user_tasks
  validates :name, uniqueness: { scope: :user_id }

  def bg_color
    "#{self.color}26"
  end
end
