$(function() {

  var buildMessageHTML = function(message) {
    // content の編集
    var contentHtml;
    message.content ? contentHtml = '<p class="lower-message__content">' + message.content + '</p>' : contentHtml = ""

    // image の編集
    var imageHtml
    message.image.url ? imageHtml = '<img src="' + message.image.url + '" class="lower-message__image" >' : imageHtml = ""

      var html = `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          ${contentHtml}
          ${imageHtml}
        </div>
      </div>`
    return html;
  };


  var reloadMessages = function() {
    // 自動更新が必要ない画面では行わないようにする
    // ⇨/groups/と/messagesの文字列が存在するURLの時のみ処理を行う
    if(location.href.indexOf('/groups/') !== -1){
      if(location.href.indexOf('/messages') !== -1){
      } else {
        return
      }
    }else{
      return
    }
    var urlchilds = location.href.split('/');
    urlchilds.splice(-1, 0, 'api')
    url = urlchilds.join('/')
    

    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    messageAll = document.getElementsByClassName('message')
    var last_message_id = 0
    var num = 0
    $.each(messageAll,function(index,message){
      num = $(message).data('message-id')
      if(last_message_id < num){
        last_message_id = num
      }
    });


    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: url,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages,function(index,message){
        //メッセージが入ったHTMLを取得
        insertHTML = insertHTML + buildMessageHTML(message)
      });
      //メッセージを追加
      $('.messages').append(insertHTML);     
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');  
    })
    .fail(function() {
      alert("メッセージの自動読み込みに失敗しました");
    });

  };



  function buildHTML(message){
    var imageHtml;
    message.image.url ? imageHtml = "<img src=" + message.image.url + ">" : imageHtml = ""
    var html = `
    <div class="message" data-message-id=${message.id}>
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name}
        </div>
        <div class="upper-message__date">
          ${message.date}
        </div>
      </div>
      <div class="lower-message">
        <p class="lower-message__content">
          ${message.content}
        </p>
      </div>
        ${imageHtml}
    </div>`
    return html;
 
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: (url),  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: (formData),  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);      
      $('form')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');  
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  })




 

  setInterval(reloadMessages, 7000);
})




