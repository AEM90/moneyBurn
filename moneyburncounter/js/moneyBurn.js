let gifCounter = 0;
let stop = 0;
let gifList = [
  "https://giphy.com/embed/JpG2A9P3dPHXaTYrwu",
  'https://giphy.com/embed/SgMWo2yQI3C1TxoTKD',
  'https://giphy.com/embed/qXR53U25GPeocwivdd/video', 
  "https://giphy.com/embed/YJjvTqoRFgZaM",
  "https://giphy.com/embed/xT9DPofgEkyu9t4wPm",
  "https://giphy.com/embed/l0G199PTGPPjC5r20",
  "https://giphy.com/embed/LdOyjZ7io5Msw",

  ];
shuffleArray(gifList);


window.addEventListener("load", (event) => {
  let moneyCounterString = document.getElementById('moneyCounter');
  moneyCounterString.innerText = 'Teilnehmer ... ?';
});


function main() {

  if (stop > 0) {
    return;
  }

  stop = 1;
  var seconds = 1;
  var el = document.getElementById('seconds-counter');
  var counter = document.getElementById('moneyCounter');
  var starttime = document.getElementById('t_start');
  var balance = 1;
  var lastThreshhold = 1;

  var dropdown = document.getElementById('dropdown');
  var userList = document.getElementsByClassName('dropdown-users');

  var cost_per_second = init_countMoney(
    count_vw,
    count_del,
    count_dico,
    count_mhp
    );
  console.log(cost_per_second);

  function incrementSeconds() {
      seconds += 1;
      balance += cost_per_second;
      //counter.innerText = "You have been here for " + seconds + " seconds. We burned " + balance + " Euro so far."
      counter.innerText = Math.floor(balance) + ' \u20AC';

      if (balance >= lastThreshhold + 1000) {
          show_gif();
          setTimeout(() => {document.getElementById("moneyGif").style.display = 'none';}, 5000);
          lastThreshhold = Math.floor(balance/1000) * 1000;
      }
  }

  var starting_costs = init_balance(starttime, cost_per_second);
  balance += starting_costs;
  var cancel = setInterval(incrementSeconds, 1000); 

  document.getElementById("savebtn").addEventListener("click", function() {

    const today = new Date();
    const formattedDate = today.toDateString(); // Format the date as a string
    const name = "moneyBurnCounter";
    const newline = '\n';

    const this_balance = document.getElementById('moneyCounter');


    const textToWrite = name + newline + formattedDate + newline + newline + 'Die heutige Sitzung hat ' + this_balance.innerText + ' gekostet und ' +  Math.floor(seconds*60) + ' Minuten gedauert.' + newline + newline + 'Gratulation!'; 

    // Create a Blob with the text content
    const blob = new Blob([textToWrite], { type: 'text/plain' });

    // Create an Object URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'moneyBurnCountermoneyBurnCounter.txt'; // Specify the filename

    // Programmatically click the <a> element to trigger the download
    a.click();

    // Release the Object URL
    URL.revokeObjectURL(url);

  });

}



/* MAIN ENDE */
/* ES FOLGEN METHODEN */

function init_countMoney(num_vw, num_del, num_dico, num_mhp) {
  const vw_h = 130;
  const del_h = 155;
  const dico_h = 125;
  const mhp_h = 80;


  const cost_per_hour = num_vw.value * vw_h + num_dico.value * dico_h + num_del.value * del_h + num_mhp.value * mhp_h;
  const cost_per_second = cost_per_hour/3600;
  return cost_per_second;
}


function init_balance(starttime, cost_per_second) {
  if (starttime.value == '') {
    return 0;
  }

  let time1 = starttime.value;
  const [hours1, minutes1] = time1.split(':').map(Number);
  const currentTime = new Date();
  const time2 = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), hours1, minutes1);
  const timeDifference = Math.abs(time2 - currentTime) / 1000;
  starting_costs = Math.floor(timeDifference * cost_per_second);
  return starting_costs;
}

// visualize GIF
function show_gif(){
  if (gifCounter == gifList.length) {
    gifCounter = 0;
  }
  this_src = gifList[gifCounter];
  document.getElementById("moneyFrame").src = 'TEST';
  document.getElementById("moneyFrame").src = this_src;
  document.getElementById("moneyGif").style.display = "flex";
  gifCounter++;
}

function toggle(thisElement) {
  const thisToggle = document.getElementById(thisElement);
  if (thisToggle.style.display === 'none' || thisToggle.style.display === '') {
      // If it's currently hidden, show it
      thisToggle.style.display = 'flex';
  } else {
      // If it's currently shown, hide it
      thisToggle.style.display = 'none';
  }
}

// Add Person
function decrement(count) {
  let thisCount = document.getElementById(count);
  thisCount.value --;
}

function increment(count) {
  let thisCount = document.getElementById(count);
  thisCount.value++;
}

function reset() {
  const userConfirmed = confirm("Are you sure you want to reset the counter?");

  if (userConfirmed) {
    location.reload();
  }
}

// Ask for confirmation when the user tries to refresh the page
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = ''; // This is for older browsers
    const userConfirmed = confirm("Are you sure you want to refresh the page?");
    if (userConfirmed) {
        window.location.reload();
    }
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

function setFocus() {
  const div = document.querySelector("#moneyCounter");
  div.focus();
}

