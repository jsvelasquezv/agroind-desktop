$(document).ready(function() {
    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        // closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    // $('select').material_select();
    // $('.collapsible').collapsible({
    //   accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    // });
});