class UserTask < ApplicationRecord
  belongs_to :user
  has_one :profile, through: :user
  belongs_to :task
  belongs_to :task_list
  acts_as_list scope: :user, column: :user_position

  def task_team
    users = User.joins(:user_tasks)
              .where(user_tasks: { task: self.task })
              .where.not(user_tasks: { user: self.user })
    profiles = users.map{ |user| user.profile }
  end
end
