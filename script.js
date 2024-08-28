let playerCount;
let currentPlayer = 0;
let spyIndex;
let chosenLocation;
let roundDuration;
let timerInterval;

const locations = [
    "Beach", "Restaurant", "Movie Theater", "Space Station", "Bowling Alley", "Zoo", "Library", "Hospital",
    "School", "Police Station", "Fire Station", "Supermarket", "Bank", "Park", "Nightclub", "Museum",
    "Airport", "Train Station", "Subway Station", "Bus Station", "Harbor", "Circus", "Amusement Park",
    "Camping Site", "Concert Hall", "Opera House", "Art Gallery", "Theater", "Ski Resort", "Mountain",
    "Desert", "Forest", "Island", "Beach Resort", "Castle", "Palace", "Mansion", "Apartment Building",
    "House", "Skyscraper", "Shopping Mall", "Cafe", "Bakery", "Diner", "Farm", "Ranch", "Factory",
    "Warehouse", "Power Plant", "Wind Farm", "Bridge", "Tunnel", "Parking Garage", "Gas Station", "Highway",
    "Village", "Town", "City Hall", "Backyard", "Front Yard", "Patio", "Balcony", "Terrace", "Roof",
    "Attic", "Basement", "Garage", "Garden", "Greenhouse", "Farmhouse", "Barn", "Stable", "Dock", "Pier",
    "Boardwalk", "Marina", "Lighthouse", "River", "Lake", "Pond", "Waterfall", "Volcano", "Cave", "Cliff",
    "Canyon", "Valley", "Field", "Meadow", "Pasture", "Jungle", "Rainforest", "Swamp", "Iceberg", "Glacier",
    "Ski Lodge", "Hot Spring", "Geyser", "Desert Oasis", "Ship", "Boat", "Yacht", "Cruise Ship", "Submarine",
    "Fishing Boat", "Houseboat", "Speedboat", "Helicopter", "Glider", "Spaceship", "Observatory", "Planetarium",
    "Medieval Village", "Pirate Ship", "Ancient Temple", "Pyramid", "Ruins", "Haunted House", "Graveyard",
    "Catacomb", "Dungeon", "Maze", "Labyrinth", "Fortress", "Watchtower", "Military Base", "Naval Base",
    "Air Force Base", "Command Center", "War Room", "Bunker", "Spy Agency", "Secret Hideout", "Safe House",
    "Underground Lair", "Hidden Bunker", "Vault", "Prison", "Jail Cell", "Interrogation Room", "Courtroom",
    "Police Car", "Fire Truck", "Ambulance", "First Aid Tent", "Field Hospital", "Emergency Room", "Maternity Ward",
    "Psychiatric Hospital", "Rehab Center", "Nursing Home", "Veteran's Hospital", "Animal Hospital", 
    "Veterinarian Clinic", "Wildlife Sanctuary", "Bird Aviary", "Reptile House", "Aquarium", "Shark Tank",
    "Dolphin Show", "Penguin Exhibit", "Seal Show", "Whale Watching", "Coral Reef", "Shipwreck", "Treasure Chest",
    "Gold Mine", "Diamond Mine", "Crystal Cave", "Lava Pit", "Sauna", "Jacuzzi", "Polar Bear Exhibit",
    "Mountain Cabin", "Loch Ness", "Dragon's Lair", "Wizard's Tower", "Enchanted Forest", "Magic Circle",
    "Wishing Well", "Potion Shop", "Spellbook Library", "Alchemy Lab", "Witch's Hut", "Haunted Forest",
    "Ghost Town", "Zombie Apocalypse Shelter", "Vampire Castle", "Monster Mansion", "Frankenstein's Lab",
    "Mad Scientist's Lair", "Secret Lab", "Robot Factory", "Cyborg Workshop", "Time Travel Lab",
    "Virtual Reality Arcade", "Alien Spacecraft", "Starship Bridge", "Warp Core Room", "Black Hole Observatory",
    "Dark Matter Research Lab", "Antimatter Reactor", "Fusion Reactor", "Quantum Research Lab",
    "Particle Collider", "Neutrino Detector", "Cosmic Observatory", "Stellar Nursery", "Planetarium Dome",
    "Space Telescope", "Alien Habitat", "Lunar Outpost", "Mars Research Lab", "Galactic Outpost",
    "Deep Space Station", "Extraterrestrial Base", "Mars Colony", "Antarctica Research Station",
    "Jungle Base Camp", "Underwater Research Lab", "Arctic Ice Station", "Volcano Observatory",
    "Wildfire Command Center", "Storm Chaser Van", "Meteorological Station", "Seismology Center",
    "Avalanche Safety Hut", "Tornado Shelter", "Hurricane Command Center", "Flood Relief Shelter",
    "Earthquake Rescue HQ", "Search and Rescue Base", "Survivalist Bunker", "Dojo", "Tattoo Parlor",
    "Barbershop", "Spa", "Yoga Studio", "Dance Studio", "Recording Studio", "Art Studio",
    "Pottery Workshop", "Photography Studio"
];

function startGame() {
    console.log("Start Game function called"); // Debugging log
    playerCount = parseInt(document.getElementById("player-count").value);
    roundDuration = parseInt(document.getElementById("round-duration").value);
    console.log("Player count entered:", playerCount); // Debugging
    console.log("Round duration entered:", roundDuration); // Debugging
    if (isNaN(playerCount) || playerCount < 3 || playerCount > 30) {
        alert("Please enter a number of players between 3 and 30.");
        return;
    }
    if (isNaN(roundDuration) || roundDuration < 1 || roundDuration > 15) {
        alert("Please set the round duration between 1 and 15 minutes.");
        return;
    }

    spyIndex = Math.floor(Math.random() * playerCount);
    chosenLocation = locations[Math.floor(Math.random() * locations.length)];
    console.log("Spy index chosen:", spyIndex); // Debugging
    console.log("Location chosen:", chosenLocation); // Debugging

    document.getElementById("setup-screen").style.display = "none";
    document.getElementById("player-screen").style.display = "block";
}

function showRole() {
    const roleText = currentPlayer === spyIndex ? "You are the spy" : `Location: ${chosenLocation}`;
    document.getElementById("player-instruction").style.display = "none";
    document.getElementById("player-role").innerText = roleText;
    document.getElementById("player-role").style.display = "block";
    document.getElementById("show-role-btn").style.display = "none"; // Hide "Tap to see your role" button
    document.getElementById("next-player-btn").style.display = "block"; // Show "Tap again" button
    
    if (currentPlayer === spyIndex) {
        document.getElementById("spy-illustration").style.display = "block";
    } else {
        document.getElementById("spy-illustration").style.display = "none";
    }
}

function nextPlayer() {
    currentPlayer++;
    if (currentPlayer < playerCount) {
        document.getElementById("player-instruction").style.display = "block";
        document.getElementById("player-role").style.display = "none";
        document.getElementById("show-role-btn").style.display = "block";
        document.getElementById("next-player-btn").style.display = "none";
        document.getElementById("spy-illustration").style.display = "none";
    } else {
        startTimer();
    }
}

function startTimer() {
    let timeLeft = roundDuration * 60; // convert minutes to seconds
    document.getElementById("player-screen").style.display = "none";
    document.getElementById("timer-screen").style.display = "block";

    timerInterval = setInterval(function() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            endRound();
        }
    }, 1000);
}

function skipToEnd() {
    clearInterval(timerInterval);
    endRound();
}

function endRound() {
    document.getElementById("timer-screen").style.display = "none";
    document.getElementById("end-screen").style.display = "block";
}

function revealSpy() {
    alert("Time to reveal the spy!");
}

function startNewGame() {
    currentPlayer = 0;
    document.getElementById("setup-screen").style.display = "block";
    document.getElementById("player-screen").style.display = "none";
    document.getElementById("timer-screen").style.display = "none";
    document.getElementById("end-screen").style.display = "none";
    document.getElementById("player-role").style.display = "none";
    document.getElementById("spy-illustration").style.display = "none";
    document.getElementById("show-role-btn").style.display = "block";
    document.getElementById("next-player-btn").style.display = "none";
}
