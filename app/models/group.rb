class Group < ApplicationRecord
  has_many :group_members
  has_many :profiles, through: :group_members
end
