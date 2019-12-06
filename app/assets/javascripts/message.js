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
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.message:last').data("message-id");
        // console.log(last_message_id)

        $.ajax({ 
          url: "api/messages", 
          type: 'get',
          dataType: 'json', 
          data: {id: last_message_id} 
        })
        .done(function (messages) { 
          console.log(messages)
          var insertHTML = '';
          messages.forEach(function (message) {
            insertHTML = buildHTML(message); 
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          })
          
        })
        .fail(function () {
          alert('自動更新に失敗しました');
        });
      }
    };
    setInterval(reloadMessages, 7000);
});
