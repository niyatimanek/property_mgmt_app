class Api::V1::UsersController < ApplicationController
  def index
    #users = User.all.order(created_at: :desc)
    users = User.where(role: params[:role]).order(created_at: :desc)
    render json: users
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user
    else
      render json: { message: "Validation failed", errors: user.errors }, status: 400
    end
  end

  def show
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  def update
    if user.update(user_params)
      render json: user
    else
      render json: { message: "Validation failed", errors: user.errors }, status: 400
    end
  end

  def destroy
  end

  def deactivate
    user.update_columns(is_active: false)
    render json: {message: 'User Deactivated'}
  end

  def get_properties
    if !current_user.nil?
      properties = current_user.properties
      render json: { user: current_user, properties: properties, loggedIn: true }
    end
  end

  private

  def user_params
    params.permit(:first_name, :last_name, :username, :password, :role)
  end

  def user
    @user ||= User.find(params[:id]) 
  end 
end
