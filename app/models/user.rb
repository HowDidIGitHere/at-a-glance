class User < ApplicationRecord
  attr_reader :password

  before_validation :ensure_session_token

  validates :username, :password_digest, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  has_many :communities,
    primary_key: :id,
    foreign_key: :creator_id,
    class_name: :Community

  has_many :follows,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Follow

  has_many :followings,
    through: :follows,
    source: :community

  has_many :posts,
    primary_key: :id,
    foreign_key: :poster_id,
    class_name: :Post

  has_many :comments,
    primary_key: :id,
    foreign_key: :commenter_id,
    class_name: :Comment

  has_many :votes,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Vote

  has_many :post_karma,
    through: :posts,
    source: :votes

  has_many :comment_karma,
    through: :comments,
    source: :votes

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    if user && user.is_valid_password?(password)
      user
    else
      nil
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end
end
