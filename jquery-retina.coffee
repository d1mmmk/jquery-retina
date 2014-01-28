(( $, window ) ->    
    class Retina
        constructor: ( el, options ) ->
            @.$el = el
            if @.$el.tagName == 'IMG'
                @.options = options
                @.load()
        getSrc: ->
            switch @.options.type
                when 'data'
                    $( @.$el ).data @.options.name
                else
                    src = $( @.$el ).attr 'src'
                    fileName = src.replace /.[^.]+$/ , ''
                    fileExtension = src.replace /^.*\./ , ''
                    fileName + @.options.name + '.' + fileName
        load: ->
            src = @.getSrc()
            $.ajax {
                url: src
                type: "HEAD"
                success: ->
                    $this.attr( 'src', src )
            }
    $.retinaSupport = ->
        window.devicePixelRatio >= 1.4
    ###
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
    ###
    $.fn.retina = ( options ) -> 
        if not $.retinaSupport then return
        options = $.extend {
            type: 'sufix'
            name: '@2x'
        }, options                                
        $( @ ).each( -> 
            $this = $( @ )
            retina = $this.data 'retina'
            if not retina then $this.data 'retina', new Retina @, options 
        )
)( jQuery, window )