class Profile < ApplicationRecord
  belongs_to :user
  has_one_attached :avatar

  include PgSearch::Model
  pg_search_scope :global_search,
    against: [ :first_name, :last_name ],
    associated_against: {
      user: [ :email ]
    },
    using: {
      tsearch: { prefix: true }
    }

  def full_name
    "#{self.first_name.capitalize} #{self.last_name.capitalize}"
  end

  def default_task_list
    self.user.task_lists.find_by(name: 'default')
  end
end
