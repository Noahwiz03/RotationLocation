 // Define rotations
    const rotations = {
      1: ["Open", "Long Vator", "Short Vator", "Door", "Deck"],
      2: ["Count", "Long Vator", "Short Vator", "Door", "Deck", "Open"],
      3: ["Open", "Long Vator", "Short Vator", "Open", "Door", "Deck"],
      4: ["Open", "Count", "Long Vator", "Short Vator", "Open", "Door","Deck"],
      5: ["Open", "Open", "Long Vator", "Short Vator", "Open", "Door","Deck"],
      6: ["Open", "Open","Count", "Long Vator", "Short Vator", "Open", "Door","Deck"],
      7: ["Open", "Open", "Long Vator", "Short Vator","Open", "Open", "Door","Deck"],
      8: ["Open", "Open","Count", "Long Vator", "Short Vator", "Open", "Open", "Door","Deck"],
    };

    let currentRotation = 1;
let longday = false;
function isLongDay(){
 longday = !longday;
}
    function setRotation(rotationNumber) {
      currentRotation = rotationNumber;
      const spotSelect = document.getElementById("spotSelect");
      spotSelect.innerHTML = "";

      rotations[rotationNumber].forEach((pos, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.text = pos;
        spotSelect.add(option);
      });
    }



function showSchedule() {
  const spotIndex = parseInt(document.getElementById("spotSelect").value);
  const startTime = document.getElementById("currentTime").value;
  const scheduleDiv = document.getElementById("schedule");

  let [hours, minutes] = startTime.split(":").map(Number);
  let date = new Date();
  date.setHours(hours, minutes, 0, 0);

  const rotation = rotations[currentRotation];
  let output = "";
  let i = 0;
  let firstSpot = true;

  // Determine cutoff dynamically

  const cutoff = new Date();
  if(longday == false){
  if (hours < 13) { // before 1 PM
    cutoff.setHours(13, 0, 0, 0);
  } else if (hours >= 13 && hours < 17) { // between 1 PM and 5 PM
    cutoff.setHours(17, 0, 0, 0);
  } else { // after 5 PM
    cutoff.setHours(22, 0, 0, 0); // 10 PM
  }
 } else{cutoff.setHours(19,0,0,0);}
  // Loop until cutoff
  while (date <= cutoff) {
    const pos = rotation[(spotIndex + i) % rotation.length];
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    output += `${timeStr} → ${pos}<br>`;

    // Special rule for first rotation, first spot at 9:00
    if (currentRotation === 1 && firstSpot && startTime === "09:00") {
      date.setMinutes(date.getMinutes() + 60); // first spot = 1 hour
      firstSpot = false;
    } else {
      date.setMinutes(date.getMinutes() + 30); // normal 30 min
    }

    i++;
  }

  scheduleDiv.innerHTML = output;
}


    // Load first rotation on page load
    setRotation(1);
