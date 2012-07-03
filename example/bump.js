var vb = require('../')('RRLK');
vb.search('dude', function (err, res) {
    vb.bump(res[0].id);
});
