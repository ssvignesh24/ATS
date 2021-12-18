# Preview all emails at http://localhost:3000/rails/mailers/account_invite
class AccountInvitePreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/account_invite/send_invitation
  def send_invitation
    AccountInviteMailer.send_invitation
  end

end
