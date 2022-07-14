import clock from 'clock';
import document from 'document';
import { preferences } from 'user-settings';
import { HeartRateSensor } from 'heart-rate';
import { today } from 'user-activity';
import { zeroPad, getWeekday, getMonth, metersToMiles } from '../common/utils';

clock.granularity = 'minutes';

const time = document.getElementById('time');
const date = document.getElementById('date');

clock.ontick = (event) => {
  let today = event.date;
  let hours = today.getHours();
  let amPm = hours < 12 ? 'am' : 'pm';
      
  if (preferences.clockDisplay === '12h') {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = zeroPad(hours);
  }
  let mins = zeroPad(today.getMinutes());
  time.text = `${hours}:${mins}`;
  
  let weekday = getWeekday(today.getDay());
  let month = getMonth(today.getMonth());
  let day = today.getDate();
  
  date.text = `${weekday}, ${month} ${day}`;
}

const heartRateSensor = new HeartRateSensor();

const steps = document.getElementById('steps');
const calories = document.getElementById('calories');
const heartRate = document.getElementById('heart-rate');
const distance = document.getElementById('distance');

function updateActivity() {
  steps.text = today.adjusted.steps;
  calories.text = today.adjusted.calories;
  
  let miles = metersToMiles(today.adjusted.distance);
  
  distance.text = `${miles.toFixed(2)}mi`;


  heartRate.text = heartRateSensor.heartRate || '';
}

heartRateSensor.start();
updateActivity();
setInterval(updateActivity, 1500);