class Profile < ApplicationRecord
  belongs_to :user
  has_one_attached :avatar

  def full_name
    "#{self.first_name.capitalize} #{self.last_name.capitalize}"
  end
end
