class Token
  def self.generate(record, column: , size: 32)
    token = SecureRandom.hex(size)
    previous_token = record[column]
    32.times do |_|
      token = SecureRandom.hex(size)
      computed_token = OpenSSL::HMAC.hexdigest('sha1', Rails.application.credentials.salt, token)
      next if record.class.where("#{column} = ?", computed_token).take.present?
      record[column] = computed_token
      break
    end
    raise "Cannot generate token" if previous_token == record[column]
    [record, token]
  end

  def self.get_record_from_token(model_class, column:, token: )
    computed_token = OpenSSL::HMAC.hexdigest('sha1', Rails.application.credentials.salt, token)
    model_class.where("#{column} = ?", computed_token).take
  end
end