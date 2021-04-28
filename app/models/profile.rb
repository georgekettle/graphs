class Profile < ApplicationRecord
  belongs_to :user
  has_many :group_members
  has_many :groups, through: :group_members
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

  def initials
    return "#{self.first_name.first.capitalize}#{self.last_name.first.capitalize}" if self.first_name && self.last_name
    return "#{self.user.email[0..1].capitalize}"
  end

  def default_task_list
    self.user.task_lists.find_by(name: 'default')
  end
end
