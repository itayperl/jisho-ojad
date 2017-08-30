function parseOJAD(page)
{
    var html = $(page);
    var results = {};
    var activeWord = null;

    var activeHeader = [];

    html.find('#search_result').find('tr').each(function(idx, elt) {
        elt = $(elt);

        if (elt.parent().prop('tagName') == 'THEAD')
        {
            /* handle header */
            activeHeader = [];
            elt.find('th:not(.visible)').each(function(idx, elt)
            {
                elt = $(elt);
                var text = $.trim(elt.text());
                if (text == '')
                {
                    return;
                }

                activeHeader[activeHeader.length] = text;
            });
            return;
        }

        /* handle row */
        elt.find('td:not(.visible)') .each(function(idx, elt)
        {
            elt = $(elt);
            var text = $.trim(elt.text());
            if (text == '')
            {
                return;
            }
            if (elt.hasClass('midashi'))
            {
                var word = text;
                var idx = word.search('\\[|・');
                if (idx != -1)
                {
                    word = word.substr(0, idx);
                }
                if ((word.length > 2) && (word.substr(-2) == 'する'))
                {
                    word = word.substr(0, word.length-2);
                }

                if (!results.hasOwnProperty(word))
                {
                    results[word] = [];
                }
                results[word][results[word].length] = activeWord = { header: activeHeader, data: [] }
                return;
            }
            else
            {
                activeWord.data[activeWord.data.length] = elt.find('.accented_word').html();
            }
        });
        
    });

    return results;
}
