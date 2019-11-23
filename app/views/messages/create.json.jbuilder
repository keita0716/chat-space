  json.content  @message.content
  json.image  @message.image
  json.group_id  @message.group_id
  json.user_name @message.user.name
  json.date @message.created_at.strftime("%Y年%m月%d日 %H時%M分")#idもデータとして渡す
json.id @message.id