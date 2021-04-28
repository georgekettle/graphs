class GroupsController < ApplicationController
  layout 'no_navbar', only: [:show, :new, :info]
  before_action :set_group, only: [:show, :info]

  def index
    @groups = current_user.profile.groups
  end

  def show
  end

  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    @group.group_members.build(profile: current_user.profile, role: 0) # role 0 => 'member'

    if @group.save
      redirect_to group_path(@group)
    else
      render 'new'
    end
  end

  def info
  end

  private

  def set_group
    @group = Group.find(params[:id])
  end

  def group_params
    params.require(:group).permit(:name)
  end
end
