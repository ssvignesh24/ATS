class JobsController < ApiController
  def index
    @jobs = current_account.jobs
  end

  def show
    @job = current_account.jobs.where(id: params[:job_id]).take
    raise ApiError::NotFound.new("Invalid job") unless @job.present?
  end

  def create
    Job.transaction do
      @job = current_user.account.jobs.build(title: job_params[:title].strip, summary: job_params[:summary].strip, created_by: current_user)
      @job.team = current_account.teams.where(id: job_params[:team_id]).take
      @job.min_experience_in_years = job_params[:min_experience]
      @job.max_experience_in_years = job_params[:max_experience]
      @job.remote_type = job_params[:remote]
      @job.open_positions = job_params[:open_positions_count]
      @job.employment_type = job_params[:employment_type]
      @job.degree_qualifications = job_params[:degrees]
      @job.visibility_config = {}
      @job.save!
      job_params[:locations].each do |loc|
        city = loc[:city].strip
        state = loc[:state].strip
        country = loc[:country].strip
        location = Location.where("city ilike :city AND state ilike :state AND country ilike :country", city: city, state: state, country: country).take
        location = Location.create!(city: city, state: state, country: country) unless location.present?
        @job.locations << location
      end
    end
  end

  def update
  end

  def destroy
  end

  def activate
  end

  def deactivate
  end

  private

  def job_params
    params.require(:job).permit(
      :title, :summary, :team_id,
      :min_experience, :max_experience, :open_positions_count,
      :remote, :employment_type, :description,
      degrees: [],  locations: [:city, :state, :country])
  end
end
