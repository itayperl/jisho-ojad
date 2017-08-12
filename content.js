var busy = false;

function add_pitch()
{
    var d = $.Deferred();
    var p = d.promise();

    if (busy)
    {
        return;
    }
    busy = true;

    var result = {};
    var words = [];

    $('#primary .concept_light-wrapper').each(function() {
        if ($(this).parent().find('.ojad').length > 0) {
            return;
        }

        var word = $(this).find('.concept_light-readings .text').text().trim();
        words[words.length] = word;

        p = p.then(function() {
            if (!result.hasOwnProperty(word))
            {
                return;
            }

            var addAfter = $(this).parent().find('.meanings-wrapper').children().last();
            addAfter = $('<div class="ojad meaning-tags">Pitch accent</div>').insertAfter(addAfter);

            for (var i in result[word])
            {
                var html = $(result[word][i].data[0]);
                var obj;
                addAfter = obj = $('<div class="ojad meaning-wrapper"></div>').append($('<div class="ojad-tooltip-hover"/>').html(html)).insertAfter(addAfter);

                var table = $('<table/>');
                for (var idx in result[word][i].header)
                {
                    var tr = $('<tr/>');

                    var datum = word;
                    if (idx > 0)
                    {
                        datum = result[word][i].data[idx-1];
                    }

                    if ($.trim(datum) == '')
                    {
                        continue;
                    }

                    tr.append($('<th/>').text(result[word][i].header[idx]))
                    tr.append($('<td/>').html(datum));

                    table.append(tr);
                }

                obj.append($('<div class="ojad-tooltip"></div>').append(table));
            }
        }.bind(this));
    });

    p.then(function() { busy = false; });

    chrome.runtime.sendMessage(null, {words: words}, function(obj) {
        result = obj;
        console.log(result);
        d.resolve();
    });
}

$(function() {
    add_pitch();

    var observer = new MutationObserver(function(mutations) {
        add_pitch();
    });

    observer.observe($('body')[0], { subtree:true, childList: true });
});
