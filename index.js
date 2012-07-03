var request = require('request');

module.exports = function (roomId) {
    return new VoiceBox(roomId);
};

function VoiceBox (roomId) {
    this.roomId = roomId;
}

VoiceBox.prototype.search = function (search, cb) {
    var opts = {
        uri : 'http://voiceboxpdx.com/api/v1/songs/search.json?query='
            + search.replace(/\s+/g, '+')
        ,
        json : true
    };
    request(opts, function (err, res, body) {
        if (err) cb(err)
        else cb(body.songs)
    });
};

VoiceBox.prototype.getQueue = function (cb) {
    var opts = {
        uri : 'http://voiceboxpdx.com/api/v1/queue.json?room_code='
            + this.roomId,
        json : true,
    };
    return request.get(opts, function (err, res, body) {
        if (err) cb(err)
        else cb(null, body.queue)
    });
}

VoiceBox.prototype.clearQueue = function (cb) {
    var opts = {
        method : 'DELETE',
        uri : 'http://voiceboxpdx.com/api/v1/queue.json?room_code='
            + this.roomId,
    };
    return request(opts, cb);
}

VoiceBox.prototype.addSong = function (id, cb) {
    return request.post('http://voiceboxpdx.com/api/v1/queue.json?'
        + 'room_code=' + this.roomId + '&song_id=' + id, cb);
}

VoiceBox.prototype.bump = function (id) {
    var self = this;
    self.getQueue(function (err, queue) {
        if (err) console.error(err);
        self.clearQueue(function (err) {
            self.addSong(id, function (err) {
                queue.forEach(function (q) {
                    self.addSong(q.song_id);
                });
            });
        });
    });
};

VoiceBox.prototype.deleteItem = function deleteItem (ix, cb) {
    var self = this;
    self.getQueue(function (err, queue) {
        self.clearQueue(function (err) {
            if (err) return cb(err);
            queue.forEach(function (q) {
                if (q.index === ix) return;
                self.addSong(q.song_id);
            });
        });
    });
}
