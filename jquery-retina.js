(function() {
  (function($, window) {
    var Retina;
    Retina = (function() {
      function Retina(el, options) {
        this.$el = el;
        if (this.$el.tagName === 'IMG') {
          this.options = options;
          this.load();
        }
      }

      Retina.prototype.getSrc = function() {
        var fileExtension, fileName, src;
        switch (this.options.type) {
          case 'data':
            return $(this.$el).data(this.options.name);
          default:
            src = $(this.$el).attr('src');
            fileName = src.replace(/.[^.]+$/, '');
            fileExtension = src.replace(/^.*\./, '');
            return fileName + this.options.name + '.' + fileName;
        }
      };

      Retina.prototype.load = function() {
        var src;
        src = this.getSrc();
        return $.ajax({
          url: src,
          type: "HEAD",
          success: function() {
            return $this.attr('src', src);
          }
        });
      };

      return Retina;

    })();
    $.retinaSupport = function() {
      return window.devicePixelRatio >= 1.4;
    };
    /*
    retina plugin
    example1 (default):
        {
            type: "sufix"
            name: "@2x"
        }
    example2:
        {
            type: "data"
            name: 'retina-src'
        }
    
    @param {object} options
    @return {object}
    */

    return $.fn.retina = function(options) {
      if (!$.retinaSupport) {
        return;
      }
      options = $.extend({
        type: 'sufix',
        name: '@2x'
      }, options);
      return $(this).each(function() {
        var $this, retina;
        $this = $(this);
        retina = $this.data('retina');
        if (!retina) {
          return $this.data('retina', new Retina(this, options));
        }
      });
    };
  })(jQuery, window);

}).call(this);
