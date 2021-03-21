class UserTasksController < ApplicationController
  before_action :set_user_task, only: [ :change_user_position ]
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

  def set_user_task
    @user_task = UserTask.find(params[:id])
  end
end
