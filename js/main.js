(function() {
    jQuery(document).ready(function() {
        jQuery('.day').each(function() {
            var index = jQuery(this).index();

            var clone_options = jQuery('.ui-options .hours').clone();

            clone_options.find('.form-primary select[name="_from"]').attr('name', '_from_' + index);
            clone_options.find('.form-primary select[name="_to"]').attr('name', '_to_' + index);
            clone_options.find('.form-split select[name="_from_split"]').attr('name', '_from_split_' + index);
            clone_options.find('.form-split select[name="_to_split"]').attr('name', '_to_split_' + index);

            jQuery(this).find('p').after(clone_options);

            jQuery(this).find('.split_time input').on('click', function() {
                jQuery(this).parent().parent().find('.form-split').toggle();
            });

            jQuery(this).find('.save').on('click', function(e) {
                e.preventDefault();
                var container_index = jQuery(this).parent().parent().index(),
                    container_day = jQuery(this).parent().parent().attr('class').replace('day ', ''),
                    _from = jQuery(this).parent().find('.form-primary select[name="_from_' + container_index + '"]').find(":selected").text(),
                    _to = jQuery(this).parent().find('.form-primary select[name="_to_' + container_index + '"]').find(":selected").text(),
                    _from_split = jQuery(this).parent().find('.form-split select[name="_from_split_' + container_index + '"]').find(":selected").text(),
                    _to_split = jQuery(this).parent().find('.form-split select[name="_to_split_' + container_index + '"]').find(":selected").text(),
                    is_checked = jQuery(this).parent().find('input[name="add-split-time"]').is(':checked'),
                    day = jQuery('.interface .' + container_day + ' p label').text(),
                    additonal_info = jQuery(this).parent().find('.additonal-info').val();
                html = '';

                if (is_checked) {
                    html = '<b>' + day + '</b>' + '- <br>' + _from + ' - ' + _to + ' and ' + _from_split + ' - ' + _to_split + '<br>' + additonal_info;
                } else {
                    html = '<b>' + day + '</b>' + '- <br>' + _from + ' - ' + _to + '<br>' + additonal_info;
                }

                jQuery('.preview .' + container_day).html(html);
            });

        });
    });

    jQuery('.interface p input[type="checkbox"]').on('click', function() {
        jQuery(this).parent().parent().find('.hours').toggle(function() {
            var container_day = jQuery(this).parent().attr('class').replace('day ', '');

            if (!jQuery(this).is(':checked')) {
                jQuery('.preview .' + container_day).html('');
            }
        });
    });

    jQuery.get("https://holidayapi.com/v1/holidays?country=US&public=true&&year=2016&key=5e4c8dbc-9ced-4456-a327-6569f99592fb", function(data) {

        jQuery.map(data['holidays'], function(val, i) {
            var input_identifier = val[0]['name'].replace(/ /g, "_").replace(",", '').replace(".", '').replace("'", '').toLowerCase();
            var holidays_input = '<p><input type="checkbox" id="' + input_identifier + '"/><label  for="' + input_identifier + '">' + val[0]['name'] + ' (' + val[0]['date'] + ')' + '</label></p>';

            jQuery('.additional_days').append(holidays_input);

        });
        jQuery('.additional_days p input[type="checkbox"]').on('click', function() {
            var selected_holiday_identifier = jQuery(this).attr('id');
            var selected_holiday = jQuery(this).parent().find('label').text();
            if (jQuery(this).is(':checked')) {
                jQuery('.additional_open').append('<span class="' + selected_holiday_identifier + '">' + selected_holiday + '<br>');
            } else {
                jQuery('.' + selected_holiday_identifier).remove();
            }
        });


    });

})();
