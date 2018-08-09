$(function() {
    let $messagesView = $('#display_message');
    let $sender = $('#sender');
    let $message = $('#message');

    $.ajax({
        type: 'GET',
        url: '/messages?lastindex=5',
        success: function(messages) {
            $.each(messages, function(i, message) {
                $messagesView.append('<p><strong>' + message.sender + ': </strong>' + message.message + '</p>');
            })
        },
        error: function() {
            alert("There was an error in getting the data");
        }
    });

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
                $messagesView.append('<p><strong>' + newMessage.sender + ': </strong>' + newMessage.message + '</p>');
            },
            error: function() {
                alert('There was an error in saving the message');
            }
        })

    });

});