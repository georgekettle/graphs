class Profile < ApplicationRecord
  belongs_to :user

  def full_name
    "#{self.first_name.capitalize} #{self.last_name.capitalize}"
  end
end
