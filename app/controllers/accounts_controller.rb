class AccountsController < ApplicationController
  skip_before_action :authenticate_user!, only: :create
  before_action :validate_user_params, only: :create

  def create
    Account.transaction do
      @account = Account.new(name: user_params[:account_name].strip, power_account: false, active: true).tap do |acc|
        acc.account_tz = Account::DEFAULT_TIMEZONE
        acc.account_locale = Account::DEFAULT_LOCALE
      end
      @account.save!
      
      @user = User.create(account: @account, name: user_params[:name].strip, password: user_params[:password].strip, active: true).tap do |user|
        user.email = @invite.email
        user.user_tz = Account::DEFAULT_TIMEZONE
        user.user_locale = Account::DEFAULT_LOCALE
        user.admin_user = true
        user.power_user = false
        user.deleted = false
      end
      @user.save!

      @invite.update!(account: @account)
      sign_in(@user)
      flash[:info] = "Success"
      redirect_to root_path
    end
  rescue => e
    ErrorReporter.send(e)
    flash[:notice] = 'Something went wrong, please try again'
    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(:name, :password, :plan_id, :account_name)
  end

  def validate_user_params
    @errors = {}
    if user_params[:account_name].blank?
      @errors[:account_name] = 'Company name is blank'
    elsif user_params[:account_name].size <= 1
      @errors[:account_name] = 'Company name is too short'
    end

    if user_params[:name].blank?
      @errors[:name] = 'Name is blank'
    elsif user_params[:name].size <= 1
      @errors[:name] = 'Name is too short'
    end
    password_error = PasswordValidator.validate(user_params[:password])
    @errors[:password] = password_error if password_error.present?
    @invite = Token.get_record_from_token(AccountInvite, column: 'invitation_token', token: params[:token])
    @errors[:general] = "Invalid invitation" unless @invite.present? && @invite.email == params[:email].strip
    if @errors.present?
      @data = user_params
      render template: "account_invites/accept"
    end
  end
end
