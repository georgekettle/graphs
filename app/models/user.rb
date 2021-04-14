class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :task_lists, dependent: :destroy
  has_many :user_tasks, -> { order(user_position: :asc) }, dependent: :destroy
  has_many :tasks, through: :user_tasks
  has_one :profile, dependent: :destroy

  after_create :set_default_task_list

  # after_create :set_profile # May neeed this in future

  def user_tasks_on_date(date) # date is Date object
    join_query = "JOIN tasks ON user_tasks.task_id = tasks.id"
    self.user_tasks.joins(join_query)
      .where(tasks: { start_date: date })
  end

  def default_task_list
    self.task_lists.find_by(name: 'default')
  end

  private

  def set_default_task_list
    task_list = TaskList.create(user: self, emoji: '🌟', name: 'default', color: "#FFFFFF")
  end

  # def set_profile
  #   profile = Profile.create()
  #   self.profile = profile
  # end
end
