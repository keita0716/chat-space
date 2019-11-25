class MessagesController < ApplicationController
  before_action :set_group
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    @group_users = GroupUser.where(group_id: params[:group_id])
    # @group = Group.find(params[:group_id])
  end

  def create
    @message = Message.create(content: message_params[:content], image: message_params[:image], group_id: message_params[:group_id],user_id: current_user.id)
    respond_to do |format|
      format.html { redirect_to group_messages_path, notice: "メッセージを送信しました" }
      format.json
    end
  end

  private
  def message_params
    params.permit(:content, :image, :group_id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end

