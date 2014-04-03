class RunsController < ApplicationController

	def new
		@run = Run.new
	end

	def create
		@run = Run.new(run_params(params))
		@run.user_id = session[:user]
		if @run.save
			render :json => Run.find_all_by_user_id(session[:user])
		else
			#handle error
		end
	end

	def update
		@run = Run.find(params[:id])
		if @run.update(run_params(params))
			render :json => Run.find_all_by_user_id(session[:user])
		else
			puts("Could not find the object to update")#error here
		end
	end


	def filter
		if (params[:min_distance].empty?)
			min_distance = 0
		else
			min_distance = params[:min_distance].to_f
		end
		if (params[:max_distance].empty?)
			max_distance = nil
		else
			max_distance = params[:max_distance].to_f
		end
		render :json => Run.filter(session[:user], params[:text], params[:start_date], params[:end_date],
		 min_distance, max_distance, params[:min_time], params[:max_time])
	end
	private

	def run_params(params)
		return params.permit(:user_id, :name, :date, :distance, :start_time, :end_time, :notes)
	end
end
