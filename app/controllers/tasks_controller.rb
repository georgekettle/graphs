class TasksController < ApplicationController
  before_action :set_task, only: [:update, :toggle, :members]
  layout "no_navbar", :only => [ :new, :members ]

  def new
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)
    @user_task = UserTask.create!(task: @task, user: current_user, task_list: current_user.default_task_list)
    if @task.save
      redirect_to tasks_url
    else
      render :new
    end
  end

  def index
    @date = set_date
    @user_tasks = current_user.user_tasks_on_date(@date)
  end

  def update
    if @task.update(task_params)
      redirect_to tasks_url
    else
      render :index
    end
  end

  def toggle
    @task.update(completed: !@task.completed)
    respond_to do |format|
      format.json { render json: @task }
    end
  end

  def members
    @user_tasks = @task.user_tasks
    # @profiles = @task.profiles
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def set_date
    return Date.parse(params[:date]) if params[:date]
    Date.today
  end

  def task_params
    params.require(:task).permit(:completed, :name, :start_date)
  end
end
