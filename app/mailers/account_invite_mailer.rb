class AccountInviteMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.account_invite_mailer.send_invitation.subject
  #
  def send_invitation(invite_id, token)
    @invitation = AccountInvite.where(id: invite_id).take
    return unless @invitation.present?
    @token = token
    mail to: @invitation.email, subject: "Invite | Complete your profile"
  end
end
