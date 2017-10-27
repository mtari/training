(function($){

  var ListView = Backbone.View.extend({
    el: $('body'), // attaches `this.el` to an existing element.

    initialize: function(){
       this.render(); // not all views are self-rendering. This one is.
    },

    render: function(){
      $(this.el).append("<ul> <li>hello world</li> </ul>");
    }
  });

  var listView = new ListView();
  
})(jQuery);