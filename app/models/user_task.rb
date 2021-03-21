class UserTask < ApplicationRecord
  belongs_to :user
  belongs_to :task
  belongs_to :task_list
  acts_as_list scope: :user, column: :user_position
end
