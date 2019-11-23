$(function(){ 
  function buildHTML(message){
        image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
        let html = `<div class=message>
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
                          ${image}
                        </div>
                      </div> `
        $('.messages').append(html); 
      }
$('.js-form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.messages').append(html);
       $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
       $('form')[0].reset();
     })
      .fail(function(){
        alert('error');
      });
      return false;
    });
});