class GroupMembersController < ApplicationController
  layout "no_navbar", only: [ :new, :index ]

  before_action :set_group, only: [ :new, :create, :index ]
  before_action :set_group_member, only: [:destroy]

  def new
    @group_member = GroupMember.new
  end

  def create
    begin
      # something which might raise an exception
      @profiles = set_profiles
      @profiles.each do |profile|
        GroupMember.create!(group: @group, profile: profile, role: 'member') unless GroupMember.find_by(group: @group, profile: profile)
      end
      redirect_to group_url(@group)
    rescue
      @group_member = GroupMember.new
      render 'new'
    end
  end

  def index
    @group_members = @group.group_members
    # @profiles = @group.profiles
  end

  def destroy
    @group_member.destroy
    redirect_to group_group_members_url(@group_member.group)
  end

  private

  def set_profiles
    return [] if params[:group_member][:profile_id].empty?
    params[:group_member][:profile_id].first.split(',').map do |profile_id|
      Profile.find(profile_id)
    end
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

  def set_group_member
    @group_member = GroupMember.find(params[:id])
  end
end
