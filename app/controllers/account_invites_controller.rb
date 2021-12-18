class AccountInvitesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create, :accept]

  def create
    email = params[:email].strip
    unless Mail::Address.new(email).domain.present?
      flash[:notice] = "Invalid email" 
      redirect_to(root_path) and return
    end
    invite = AccountInvite.where(email: email).first_or_initialize
    invite.invited_at = Time.zone.now
    invite, token = Token.generate(invite, column: :invitation_token)
    invite.save!
    AccountInviteMailer.send_invitation(invite.id, token).deliver_now
    flash[:info] = "Invitation sent to your email. See you on the other side!" 
    redirect_to(root_path)
  rescue => e
    ErrorReporter.send(e)
    flash[:notice] = 'Something went wrong, please try again'
    redirect_to root_path
  end

  def accept
    @email = params[:email]&.strip
    unless Mail::Address.new(@email).domain.present?
      flash[:notice] = "Invlid email" 
      redirect_to(root_path) and return
    end
    if User.where(email: @email).take.present?
      redirect_to root_path and return
    end
    invite = Token.get_record_from_token(AccountInvite, column: 'invitation_token', token: params[:token])
    unless invite.present? && invite.email == @email
      flash[:notice] = "Invalid invitation" 
      redirect_to(root_path) and return
    end
    @data = {}
    @errors = {}
  end
end
