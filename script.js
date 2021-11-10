$(function(){
    $('.accordion').on('click', '.accordion-control', function(e){
        e.preventDefault();

        $('.accordion-panel.active').slideToggle();
        $('.accordion-panel').removeClass('active');
        $(this)
            .next('.accordion-panel')
            .not(':animated')
            .slideToggle(500)
            .toggleClass('active');
    });

    $('.tab-list').each(function(){
        var $this = $(this);

        $this.on('click', '.tab-control', function(e){
            e.preventDefault();
            var $link = $(this);
            var $tab = $link.parent();
            var id = this.hash;
            
            if(id && !$tab.is('.active')){
                var $oldTab = $this.find('li.active');
                var $oldLink = $oldTab.find('a').attr('href');

                $($oldLink).removeClass('active');
                $oldTab.removeClass('active');
                $(id).addClass('active');
                $tab.addClass('active');
            }
        });
    });
});