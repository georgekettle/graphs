class UserTasksController < ApplicationController
  layout "no_navbar", :only => [ :new, :select_task_list ]

  before_action :set_user_task, only: [ :change_user_position, :select_task_list, :update, :show, :destroy, :toggle_priority ]
  before_action :set_task, only: [ :new, :create ]

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
      redirect_to members_task_url(@user_task.task)
    rescue
      @user_task = UserTask.new
      render 'new'
    end
  end

  def show
  end

  def destroy
    @user_task.destroy
    redirect_back(fallback_location: members_task_url(@user_task.task))
  end

  def update
    if @user_task.update(user_task_params)
      respond_to do |format|
        format.json { render json: @user_task }
      end
    end
  end

  def toggle_priority
    @user_task.priority = !@user_task.priority
    if @user_task.save
      respond_to do |format|
        format.json { render json: @user_task }
      end
    end
  end

  def change_user_position
    resort_user_tasks_on_date
    if update_position
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

  def select_task_list
  end

  private

  def update_position
    return true if params[:position] && @user_task.user_position == params[:position].to_i
    return true if params[:position] && @user_task.insert_at(params[:position].to_i)
  end

  def resort_user_tasks_on_date
    date = @user_task.task.start_date
    current_user.user_tasks_on_date(date).reverse.each do |user_task|
      user_task.move_to_top
    end
  end

  def set_profiles
    return [] if params[:user_task][:profile_id].empty?
    params[:user_task][:profile_id].first.split(',').map do |profile_id|
      Profile.find(profile_id)
    end
  end

  def set_task
    @task = Task.find(params[:task_id])
  end

  def set_user_task
    @user_task = UserTask.find(params[:id])
  end

  def user_task_params
    params.require(:user_task).permit(:task_list_id)
  end
end
