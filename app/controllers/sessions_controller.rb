class SessionsController < ApplicationController
  def create
      @user = User.find_by(username: params[:session][:username])
    
      if @user && @user.authenticate(params[:session][:password])
        login!
        render json: {
          logged_in: true,
          user: @user
        }
      elsif @user && !@user.authenticate(params[:session][:password])
        render json: { 
          status: 401,
          errors: ['Username and password combination is wrong']
        }
      else
        render json: { 
          status: 401,
          errors: ['No such user, please try again']
        }
      end
  end

  def is_logged_in?
      if logged_in? && current_user
        render json: {
          logged_in: true,
          user: current_user
        }
      else
        render json: {
          logged_in: false,
          message: 'no such user'
        }
      end
  end

  def destroy
        logout!
        render json: {
          status: 200,
          logged_out: true,
          logged_in: false
        }
  end

  private

  def session_params
        params.require(:user).permit(:username, :password)
  end
end