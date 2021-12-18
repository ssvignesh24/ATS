module ApplicationHelper

  def user_hash(user=nil)
    user ||= current_user
    hsh = user.slice(:id, :name, :email, :active)
    hsh[:userLocale] = user.user_locale
    hsh[:userTz] = user.user_tz
    hsh[:isAdmin] = user.admin_user
    hsh[:invitationPending] = user.invitation_pending?
    if user.account_id.present?
      hsh[:account] = user.account.slice(:id, :name)
      hsh[:account][:accountTz] = user.account.account_tz
      hsh[:account][:accountLocale] = user.account.account_locale
    end
    hsh
  end

  def readable_date(date, timezone=nil)
    timezone ? date&.in_time_zone(timezone)&.strftime("%d %b %Y") : date&.strftime("%d %b %Y")
  end

  def readable_time(time, timezone=nil)
    timezone ? time&.in_time_zone(timezone)&.strftime("%I:%M%p") : time&.strftime("%I:%M%p")
  end

  def readable_datetime(datetime, timezone=nil)
    timezone ? datetime&.in_time_zone(timezone)&.strftime("%d %b %Y, %I:%M%p") : datetime&.strftime("%d %b %Y, %I:%M%p")
  end

end
