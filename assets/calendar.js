// Build a Google Calendar 'create event' URL from data on the #hero element
document.addEventListener('DOMContentLoaded', function() {
  try {
    var hero = document.getElementById('hero');
    if (!hero) return;
    var startIso = hero.dataset.date; // expected ISO string
    if (!startIso) return;
    var title = hero.datasetTitle || hero.dataset.title || (document.querySelector('.couple')?.textContent || 'Save the Date');
    var location = hero.datasetLocation || hero.dataset.location || (document.querySelector('.venue-name')?.textContent || '');

    var start = new Date(startIso);
    if (isNaN(start)) return;
    // default duration 2 hours
    var end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

    function fmtUTC(d){
      // 20260502T190000Z
      var s = d.toISOString().split('.')[0];
      return s.replace(/[-:]/g,'') + 'Z';
    }

    var startStr = fmtUTC(start);
    var endStr = fmtUTC(end);

    var text = encodeURIComponent(title);
    var details = encodeURIComponent('You are invited — ' + (document.title || 'Save the date') + '\n\nVisit: ' + window.location.href);
    var loc = encodeURIComponent(location);

    var gcalUrl = 'https://www.google.com/calendar/render?action=TEMPLATE'
      + '&text=' + text
      + '&dates=' + startStr + '/' + endStr
      + '&details=' + details
      + (loc ? '&location=' + loc : '')
      + '&sprop=&sprop=name:';

    // bind to hero CTA and any other save-date buttons
    var buttons = document.querySelectorAll('.hero-cta, .save-date');
    buttons.forEach(function(cta){
      cta.style.cursor = 'pointer';
      cta.addEventListener('click', function(e){
        e.preventDefault();
        window.open(gcalUrl, '_blank');
      });
    });
  } catch (err) {
    console.error('calendar init error', err);
  }
});
