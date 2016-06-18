
$(document).ready(function () {


    function Time(){


        var month=new Array(12);
        month[0]="Январь";
        month[1]="Февраль";
        month[2]="Март";
        month[3]="Апрель";
        month[4]="Май";
        month[5]="Июнь";
        month[6]="Июль";
        month[7]="Август";
        month[8]="Сентябрь";
        month[9]="Октябрь";
        month[10]="Ноябрь";
        month[11]="Декабрь";

        var date = new Date();
        var day= date.getDay();
        var year= date.getFullYear();
        var Mstr =month[date.getMonth()];
        var time = (day + ' ' +  Mstr + ' ' + year);
        return time;
    };



    var socket = io.connect('http://localhost:8008');
    var name = 'User' + (Math.round(Math.random() * 10000));
    var messages = $("#messages");
    var message_txt = $("#message_text")
    $('.chat .nick').text(name);

    function msg(nick, message) {

        var m = '<div class="message-wrap">' +
        '<div class="info">'	+
        '<b>' + safe(nick) + '</b> ' +
        '<span>' + Time() + '</span>' +
        '</div>' +
        '<div class="message">' +
        '<p>' + safe(message) + '</p>' +
        '</div>';
        messages
        .append(m)
        .scrollTop(messages[0].scrollHeight);
    }

    function msg_system(message) {
        var m = '<div class="msg system">' + safe(message) + '</div>';
        messages
        .append(m)
        .scrollTop(messages[0].scrollHeight);
    }

    socket.on('connecting', function () {
        msg_system('');
    });

    socket.on('connect', function () {
        msg_system('');
    });

    socket.on('message', function (data) {
        msg(data.name, data.message);
        message_txt.focus();
    });

    $("#message_btn").click(function () {
        var text = $("#message_text").val();
        if (text.length <= 0)
            return;
        message_txt.val("");
        socket.emit("message", {message: text, name: name});
    });

    function safe(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
});
