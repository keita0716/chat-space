class MessagesController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
    @message = Message.new
    @messages = Message.all
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
  # def message_params
  #   params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  # end
end