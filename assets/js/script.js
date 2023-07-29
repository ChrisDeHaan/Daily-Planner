var divs = document.getElementsByClassName('time-block');

//Dynamic time displayed at top of page
var today = dayjs();
$('#currentDay').text((today.format('dddd, MMMM D YYYY')));

//Timer to tell what hour block we're in
var currentHour = today.format('H');

//for loop to check all time-blocks against the hour block and alter their classes
//Removal function used in for loop
function classReset (i) {
  divs[i].classList.remove('past', 'present', 'future')
}

for (var i = 0; i < divs.length; i++) {
  if (Number(divs[i].dataset.value) < Number(currentHour)) {
    classReset(i);
    divs[i].classList.add('past')
  } else if (Number(divs[i].dataset.value) == Number(currentHour)) {
    classReset(i);
    divs[i].classList.add('present')
  } else if (Number(divs[i].dataset.value) > Number(currentHour)) {
    classReset(i);
    divs[i].classList.add('future')
  }
}