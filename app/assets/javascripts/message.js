$(function () {
  function buildHTML(message) {
    var image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : ""; 

    var html = `<div class="message" data-message-id="${message.id}"> 
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info____data">
                      ${message.created_at}
                    </p>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
    $('.messages').append(html); 
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this); 
    let url = $(this).attr('action')
  
    $.ajax({ 
      url: url, 
      type: "POST", 
      data: formData, 
      dataType: 'json',
      processData: false, 
      contentType: false 
    })
      .done(function(data){
          buildHTML(data);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
          $('form')[0].reset();
      })
      .fail(function(){
        alert('メッセージの送信に失敗しました');
      });
      return false;
    })
  
    var reloadMessages = function () {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){//今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
        var last_message_id = $('.message:last').data("message-id"); //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
        // var group_id = $(".group").data("group-id");
  
        $.ajax({ //ajax通信で以下のことを行う
          url: "api/messages", //サーバを指定。今回はapi/message_controllerに処理を飛ばす
          type: 'get', //メソッドを指定
          dataType: 'json', //データはjson形式
          data: {last_id: last_message_id} //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためlast_idとする。
        })
        .done(function (messages) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
          var insertHTML = '';//追加するHTMLの入れ物を作る
          messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
            insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
            $('.messages').append(insertHTML);//メッセージを追加
          })
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
        })
        .fail(function () {
          alert('自動更新に失敗しました');//ダメだったらアラートを出す
        });
      }
    };
    setInterval(reloadMessages, 10000);//5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
    });
