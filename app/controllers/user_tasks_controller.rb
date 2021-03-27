class UserTasksController < ApplicationController
  before_action :set_user_task, only: [ :change_user_position, :show ]
  before_action :set_task, only: [ :new, :create ]
  layout "no_navbar", :only => [ :new ]

  def new
    @user_task = UserTask.new
  end

  def create
    @user_task = current_user.user_tasks.find_by(task: @task)
    begin
      # something which might raise an exception
      @profiles = set_profiles
      @profiles.each do |profile|
        UserTask.create!(user: profile.user, task: @task, task_list: profile.default_task_list) unless UserTask.find_by(user: profile.user, task: @task)
      end
      redirect_to user_task_path(@user_task)
    rescue
      @user_task = UserTask.new
      render 'new'
    end
  end

  def show

  end

  def change_user_position
    if params[:position] && @user_task.insert_at(params[:position].to_i)
      respond_to do |format|
        format.json { render json: @user_task }
      end
    else
      payload = {
        error_messages: ["Task position not updated, invalid request"],
        item: @user_task,
        original_position: @user_task.user_position
      }
      # payload = JSON.{ original_position: original_position }
      respond_to do |format|
        format.json { render :json => payload, :status => :bad_request }
      end
    end
  end

  private

  def set_profiles
    params[:user_task][:profile_id].map do |profile_id|
      Profile.find(profile_id)
    end
  end

  def set_task
    @task = Task.find(params[:task_id])
  end

  def set_user_task
    @user_task = UserTask.find(params[:id])
  end
end
