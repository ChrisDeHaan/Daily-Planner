var divs = document.getElementsByClassName('time-block');

//Dynamic time displayed at top of page
var today = dayjs();
$('#currentDay').text((today.format('dddd, MMMM D YYYY')));

//Timer to tell what hour block we're in
var currentHour = Number(today.format('H'));

//for loop to check all time-blocks against the hour block and alter their classes
//Removal function used in for loop
function classReset (i) {
  divs[i].classList.remove('past', 'present', 'future')
}

for (var i = 0; i < divs.length; i++) {
  if (Number(divs[i].dataset.value) < currentHour) {
    classReset(i);
    divs[i].classList.add('past')
  } else if (Number(divs[i].dataset.value) === currentHour) {
    classReset(i);
    divs[i].classList.add('present')
  } else if (Number(divs[i].dataset.value) > currentHour) {
    classReset(i);
    divs[i].classList.add('future')
  }
}

//variables for save function
var textBoxes = document.getElementsByClassName('description') 
var localStorageContent = localStorage.getItem('hourly-tasks')
var hourlyTasks

//if else to avoid null error and pull existing storage
if (localStorageContent === null) { 
  hourlyTasks = [];
  for (let i = 0; i < 9; i++ ) {
    hourlyTasks.push("");
  }
} else {
  hourlyTasks = JSON.parse(localStorageContent);
}

//Event listener for all save buttons
const saveBtn = document.querySelectorAll('.saveBtn')
saveBtn.forEach( x => (
  x.addEventListener('click', () => {
    saveHourlyTasks();
    writeHourlyTasks();
    alert("Task(s) saved successfully.")
  })
))

//function to save all the values of the textareas
function saveHourlyTasks () {
  hourlyTasks = [];
  for (let i = 0; i < 9; i++) {
    if (textBoxes[i].value === ""){
      hourlyTasks.push("")
    } else {
      hourlyTasks.push(textBoxes[i].value)
    }
  }

  localStorage.setItem('hourly-tasks', JSON.stringify(hourlyTasks))
}

//function to display the value of the textareas
function writeHourlyTasks () {
  for (var i = 0; i < hourlyTasks.length; i++) {
    textBoxes[i].value = hourlyTasks[i]
  }
}

//we'll call the writeHourlyTasks function now so we can populate the page on reload with Local storage data
writeHourlyTasks()