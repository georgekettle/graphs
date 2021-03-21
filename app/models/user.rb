class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :task_lists, dependent: :destroy
  has_many :user_tasks, -> { order(user_position: :asc) }, dependent: :destroy
  has_many :tasks, through: :user_tasks
  has_one :profile, dependent: :destroy

  def user_tasks_on_date(date) # date is Date object
    join_query = "JOIN tasks ON user_tasks.task_id = tasks.id"
    self.user_tasks.joins(join_query)
      .where(tasks: { start: datetime_range(date) })
      .or(self.user_tasks.joins(join_query)
      .where(tasks: { end: datetime_range(date) }))
  end

  private

  def datetime_range(date)
    date_time = date.to_datetime
    date_time.beginning_of_day..date_time.end_of_day
  end
end
