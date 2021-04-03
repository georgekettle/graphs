class ProfilesController < ApplicationController
  before_action :set_profile, only: [:show, :edit, :update]

  def show
  end

  def edit
  end

  def update
    if @profile.update(profile_params)
      redirect_to @profile
    else
      render :edit
    end
  end

  def search
    @profiles = Profile.global_search(params[:query])
    # html_content = render_to_string(partial: 'profiles/results', locals: { profiles: @profiles })
    render :json => { results: search_response(@profiles) }
  end

  def select_search
    @profiles = Profile.global_search(params[:query])
    # html_content = render_to_string(partial: 'profiles/results', locals: { profiles: @profiles })
    render :json => { results: select_search_response(@profiles) }
  end

  private

  def search_response(profiles)
    profiles.map do |profile|
      {
        json: profile.attributes,
        html: render_to_string(partial: 'profiles/search_result', locals: { profile: profile })
      }
    end
  end

  def select_search_response(profiles)
    profiles.map do |profile|
      {
        json: profile.attributes,
        html: render_to_string(partial: 'profiles/select_search_result', locals: { profile: profile })
        # selected_html: render_to_string(partial: 'profiles/selected_search_result', locals: { profile: profile })
      }
    end
  end

  def set_profile
    @profile = Profile.find(params[:id])
  end

  def profile_params
    params.require(:profile).permit(:first_name, :last_name, :bio, :avatar)
  end
end
