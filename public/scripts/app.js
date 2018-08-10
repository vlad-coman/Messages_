$(function() {
    let $messagesView = $('#display_message');
    let $sender = $('#sender');
    let $message = $('#message');
    let $body = $('#body');
    let lastIndex = 1;

    $('#sendMessage').on('click', function() {
        let fullMessage = {
            sender: $sender.val(),
            message: $message.val()
        };
        $.ajax({
            type: 'POST',
            url: '/messages',
            contentType: 'application/json',
            data: JSON.stringify(fullMessage),
            success: function(newMessage) {
                console.log(newMessage.sender + ' added the following message: ' + newMessage.message);
                lastIndex = newMessage.index;
            },
            error: function() {
                alert('There was an error in saving the message');
            }
        })

    });

    setInterval(function() {
        $.ajax({
            type: 'GET',
            url: '/messages?lastindex=' + lastIndex,
            success: function(message) {
                $messagesView.append('<p><strong>' + message.sender + ': </strong>' + message.message + '</p>');
                lastIndex += 1;
            },
            error: function() {
                console.log('no new messages to be added');
            }
        });
    }, 1000);

});