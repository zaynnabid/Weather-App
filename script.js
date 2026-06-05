const apiKey ="1b52533d10af5d0cddbb922bdc8648b1";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox= document.querySelector(".search input");
const searchbtn =document.querySelector(".search button");
const weather_icon = document.querySelector(".weather_icon")


async function checkweather(city)
 {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    var data = await response.json();  // ider response ko JS object ma change kr ke data nam k variable me store krta hn 

    console.log(data);


    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =  Math.round( data.main.temp) + "°C" ;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%" ;

    document.querySelector(".wind").innerHTML = data.wind.speed + " KMH" ;

    if (data.weather[0].main == "Clouds")
    {

      weather_icon.src ="assets/images/clouds.png"
    }

    else if (data.weather[0].main == "Clear")
    {
      weather_icon.src ="assets/images/clear.png"
   
      
    }
    
    else if (data.weather[0].main == "Rain")
    {
      weather_icon.src ="assets/images/rain.png"
    }
    
    else if (data.weather[0].main == "Drizzle")
    {
      weather_icon.src ="assets/images/drizzle.png"
    }
    
    else if (data.weather[0].main == "Mist")
    {
      weather_icon.src ="assets/images/mist.png"
    }
    
    else if (data.weather[0].main == "Snow")
    {
      weather_icon.src ="assets/images/snow.png"
    }
    
    

}

searchbtn.addEventListener("click", () => {
      checkweather(searchbox.value);

}); // !!!!!!!! Is semi - colon na bhoot azzab della ha  !!!! 



 //  DOM elements

const openCalendarBtn = document.getElementById("openCalendarBtn");
const closeCalendarBtn = document.getElementById("closeCalendarBtn");
const calendarModal = document.getElementById("calendarModal");

// open modal when "C" button is clicked

openCalendarBtn.addEventListener("click", () => {
  calendarModal.hidden = false;
});



// close  when clicking outside the modal 

window.addEventListener("click", (event) => {
  if (event.target === calendarModal) {
    calendarModal.hidden = true;
  }
});

document.getElementById("calendarForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const title = document.getElementById("eventTitle").value.trim();
  const date = document.getElementById("eventDate").value;
  const time = document.getElementById("eventTime").value;

  if (!title || !date || !time) {
    alert("Please fill all fields.");
    return;
  }

  const eventDateTime = new Date(`${date}T${time}`);
  const reminderTime = new Date(eventDateTime.getTime() - 2 * 60 * 60 * 1000);   // 2 hours phela

  

  const event = { title, eventDateTime: eventDateTime.toISOString(), reminderTime: reminderTime.toISOString(), notified: false };
  const events = JSON.parse(localStorage.getItem("calendarEvents") || "[]");
  
  events.push(event);

  localStorage.setItem("calendarEvents", JSON.stringify(events));

  alert("Event saved! You will get a reminder 2 hours before.");
  modal.hidden = true;

  await Notification.requestPermission();

});

// reminder checker

setInterval(() => {
  const events = JSON.parse(localStorage.getItem("calendarEvents") || "[]");
  const now = new Date();

  events.forEach((event) => {
    if (!event.notified && new Date(event.reminderTime) <= now) {
      if (Notification.permission === "granted") {
        new Notification("Reminder", { body: `Event: ${event.title}` });
      } else {
        alert(`Reminder: ${event.title}`);
      }
      event.notified = true;
   
    }
  }
);

  localStorage.setItem("calendarEvents", JSON.stringify(events));

}
, 60000); // check every minute



