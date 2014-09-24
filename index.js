module.exports = function(client) {
    var next_part = /^(.*?)(\s|$)(.*$)/;

    client.on('raw_command', function(from, to, command) {
        console.log('raw_command', from, to, command);
        var part = next_part.exec(command);
        console.log('command', part, command);

        var ev = 'command:'+part[1],
            exists = client.listeners(ev).length;

        if( !exists ) {
            client.say_message(to, from, 'notfound', {thing: part[1]});
        } else {
            client.emit(ev, from, to, part[3]);
        }
    });
};
