$(function() {

  function  makeHtml(username,userid){
    var html = `
              <div class="chat-group-user clearfix initialclass">
                <p class="chat-group-user__name">${username}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${userid}" data-user-name="${username}">追加</div>
              </div>
              `
              return html
  }

  function  makeDeleteHtml(username,userid){
    var html = `
              <div class="chat-group-user clearfix initialclass">
                <input name='group[user_ids][]' type='hidden' value='${userid}'> 
                <p class="chat-group-user__name">${username}</p>
                <div class="user-search-delete chat-group-user__btn chat-group-user__btn--add" data-user-id="${userid}" data-user-name="${username}">削除</div>
              </div>
              `
              return html
  }

  $('#user-search-field.chat-group-form__input').on('keyup', function(e) {
    e.preventDefault();
    var input = $("#" + this.id).val();
    $.ajax({
      url: '/users',  //同期通信でいう『パス』
      type: 'GET',  //同期通信でいう『HTTPメソッド』
      data: { input: input },
      dataType: 'json'
    })
    .done(function(users){
   //emptyメソッドで一度検索結果を空にする
   $('.initialclass').remove();
   //usersが空かどうかで条件分岐
   if(users.length > 0){

     //配列オブジェクト１つ１つに対する処理
     users.forEach(function( user ) {
       var html = makeHtml(user.name,user.id)
       $('#usersfield').append(html);
     });
    }
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  })

  //追加ボタンクリック処理
  $('#usersfield').on('click','.user-search-add',function(e) {
    e.preventDefault();
    console.log("追加発火！！！！！！！！！！！！！！！！！")
    console.log(this)
    //追加処理
    var html = makeDeleteHtml($(this).attr('data-user-name'),$(this).attr('data-user-id'))
    console.log(html)
    $('#addusersfield').append(html);
    // 元を削除
    $(this).parent().remove()
  })

  //削除ボタンクリック処理
  $('#addusersfield').on('click','.user-search-delete',function(e) {
    e.preventDefault();
    $(this).parent().remove()
  })

})