# voicebox

This module implements the
[voicebox api](http://voiceboxpdx.com/api/v1/documentation).
Voicebox is a sweet karaoke joint in Portland.

# example

Bump your own song to the top of the queue.

``` js
var vb = require('voicebox')('RRLK');
vb.search('dude', function (err, res) {
    vb.bump(res[0].id);
});
```
# methods

``` js
var voicebox = require('voicebox')
```

## var vb = voicebox(roomId)

Create a new voicebox instance to fuck with rooms.

## vb.search(query, cb)

Search for songs, firing `cb(err, results)`.

## vb.getQueue(cb)

Get the queue for the room as `cb(err, queue)`.

## vb.clearQueue(cb)

Clear the queue in a room because the people around you have terrible taste.

## vb.addSong(id)

Add a song the regular way like a normal person.

## vb.bump(id)

Bump your song to the top of the queue because you know how to use APIs.

## vb.deleteItem(index)

Delete a song that sucks from the queue.

# install

With [npm](http://npmjs.org) do:

```
npm install voicebox-karaoke
```

# license

MIT
