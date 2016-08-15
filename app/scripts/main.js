$(function() {

    // $(".nav a").on("click", function() {
    //     $(".nav").find(".active").removeClass("active");
    //     $(this).parent().addClass("active");
    // });

    var ViewModel = function() {
        var self = this;

        self.selection = ko.observable('#all');

        self.clickSelection = function(data, event) {
            console.log(event.target.hash);
            self.selection(event.target.hash);
            // filter array by selection?
        };

        self.refreshStreams = function() {
            console.log("Loading streams.  .  .")
        };

        self.refreshStreams();
    };

    ko.applyBindings(new ViewModel);
});
