var usernames = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp',
    'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'
];

var User = function(username, status, game, info) {
    var self = this;
    self.username = username;
    self.status = status;
    self.game = game || '';
    self.info = info || '';
    self.thumbnail = ko.observable('https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F');
};

User.prototype.userStatus = function() {
    return this.status === 'online' ? 'online' : 'offline';
};

User.prototype.createGameStatus = function() {
    if (this.game) {
        return 'Playing: ' + this.game;
    } else {
        return 'Offline';
    }
};

var ViewModel = function() {
    var self = this;

    self.selection = ko.observable('#all');
    self.usernames = ko.observableArray(usernames);

    self.userList = ko.observableArray([]);

    self.clickSelection = function(data, event) {
        self.selection(event.target.hash.substring(0));
    };

    self.refreshStreams = function() {
        self.userList([]);
        console.log('Loading streams.  .  .');
        ko.utils.arrayForEach(self.usernames(), function(username) {
            var url = 'https://api.twitch.tv/kraken/streams/' + username + '?callback=?';

            var user;
            $.getJSON(url)
                .done(function(data) {
                    if (data.stream === null) {
                        user = new User(username, 'offline');
                        self.userList.push(user);
                    } else {
                        user = new User(username, 'online', data.stream.game, data.stream.channel.status);
                        self.userList.push(user);
                    }
                    var imgUrl = 'https://api.twitch.tv/kraken/channels/' + username + '?callback=?';
                    $.getJSON(imgUrl)
                        .done(function(data) {
                            user.thumbnail(data.logo);
                        });
                });

        });
    };

    self.filterResults = function(status) {
        if (status === '#all') {
            return self.userList();
        } else {
            return ko.utils.arrayFilter(self.userList(), function(user) {
                // console.log('user.status: ' + user.status);
                // console.log('status: ' + status);
                return ('#' + user.status) === status;
            });
        }
    };

    self.findUser = function(username) {
        return ko.utils.arrayFilter(self.userList(), function(user) {
            return user.username === username;
        });
    };

    self.refreshStreams();
};

var viewModel = new ViewModel();

ko.applyBindings(viewModel);
