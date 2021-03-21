class DashboardController < ApplicationController
  def home
    @task_lists = current_user.task_lists
  end
end
