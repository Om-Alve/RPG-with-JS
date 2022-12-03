let xp=0;
let health=100;
let gold=50;
let currentWeapon=0;
let fighting;
let inventory;
let monsterHealth;
inventory=["stick"];
const button1 = document.querySelector("#button1"); 
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const monsterStats = document.querySelector("#monsterStats");

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

const locations = [
  {
    name : "Town Square",
    buttontext : ["Go to store","Go to cave","Fight dragon"],
    text : "Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above.",
    buttonclick : [goStore,goCave,fightDragon]
  },
  {
    name : "Store",
    buttontext : ["Buy 10 Health (10 Gold)","Buy a Weapon (30 Gold)","Go to Town Square"],
    text : "You've entered the store",
    buttonclick : [buyHealth,buyWeapon,goTownSquare]
  },
  {
    name : "Cave",
    buttontext : ["Fight Slime","Fight Beast","Go to Town Square"],
    text : "You've entered the cave and you see some monsters!",
    buttonclick : [fightSlime,fightBeast,goTownSquare]
  },
  {
    name : "Fight",
    buttontext : ["Attack","Dodge","Run"],
    text : "You are fighting a monster",
    buttonclick : [attack,dodge,run]
  },
  {
    name : "Kill monster",
    buttontext : ["Go to town square","Go to town square","Go to town square"],
    text : "The monster screams \"Arghhh!\" as it dies. You gain experience points and gold!",
    buttonclick : [goTownSquare,goTownSquare,goTownSquare]
  },
  {
    name : "lose",
    buttontext : ["Replay?","Replay?","Replay?"],
    text : "You died! ☠",
    buttonclick : [restart,restart,restart]
  },
  {
    name : "win",
    buttontext : ["Replay?","Replay?","Replay?"],
    text : "You Won!!!",
    buttonclick : [restart,restart,restart]
  }
];

const weapons = [
  {
    name : "stick",
    power : 5
  },
  {
    name : "dagger",
    power : 10
  },
  {
    name : "bow and arrow",
    power : 50
  },
  {
    name : "sword",
    power : 100
  }
];

const monsters = [
  {
    name : "Slime",
    level : 2,
    health : 15
  },
  {
    name : "Wolf",
    level : 8,
    health : 60
  },
  {
    name : "Dragon",
    level : 20,
    health : 300
  }
];

function update(location){
  monsterStats.style.display = "None";
  button1.innerText = location["buttontext"][0];
  button2.innerText = location["buttontext"][1];
  button3.innerText = location["buttontext"][2];
  text.innerText = location["text"];
  button1.onclick = location["buttonclick"][0];
  button2.onclick = location["buttonclick"][1];
  button3.onclick = location["buttonclick"][2];
}

function fight(){
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block"; 
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth; 
}

function attack(){
  text.innerText = "The " + monsters[fighting].name + " attacks!\n";
  text.innerText += "You attack it with your " + weapons[currentWeapon].name + ".";
  if(isMonsterHit())
  {
    health -= getMonsterAttackValue(monsters[fighting].level);
  }
  else
  {
    text.innerText = "You missed!";
  }
    healthText.innerText = health;
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  monsterHealthText.innerText = monsterHealth; 
  if(health<=0)
  {
    lose();
  }
  else if (monsterHealth<=0)
  {
    if(fighting==2)
    {
      winGame();
    }
    else
    {
      defeatMonster();
    }
  }
  if (Math.random()<=.1 && inventory.length>1)
  {
      text.innerText = "Your " + inventory.pop() + " breaks!";
      currentWeapon--;
  }
}

function getMonsterAttackValue(level){
  let hit = level;
  console.log(hit);
  return hit;
}

function isMonsterHit(){
  return Math.random() > .2 || health<=20;
}

function lose(){
  update(locations[5]);
}

function winGame(){
  update(locations[6]);
}

function restart(){
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0 ;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTownSquare();
}

function defeatMonster(){
  gold += Math.floor(monsters[fighting].level*6.7);
  xp+=monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function dodge(){
  text.innerText = "You dodged the " + monsters[fighting].name + "'s attack!";
}
function run(){
  update(location[0]);
}


function fightSlime(){
  fighting = 0;
  fight();
}

function fightBeast(){
  fighting = 1;
  fight();
}

function fightDragon(){
  fighting = 2;
  fight();
}

function goStore(){
  update(locations[1]);
}

function goTownSquare(){
  update(locations[0])
}

function buyHealth(){
  if(gold>=10 && health<=90)
  {
    gold-=10;
    health+=10;
    healthText.innerText = health;
    goldText.innerText = gold;
  }
  else if(gold<10)
  {
    text.innerText = "You don't have enough gold!";
  }
  else
  {
    text.innerText = "You have full health!";
  }
}

function buyWeapon(){
  if(currentWeapon<(weapons.length - 1))
  {
    if (gold>=30)
    {
      gold-=30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You bought a " + newWeapon + ".\n";
      inventory.push(newWeapon);
      text.innerText += "Inventory : " + inventory;
    }
    else
    {
      text.innerText = "You don't have enough gold!";
    }
  }
  else
  {
    text.innerText = "You already have the best weapon!";
    button2.innerText = "Sell weapon for 15 gold?";
    button2.onclick = sellWeapon; 
  }
}

function sellWeapon(){
  if(inventory.length > 1)
  {
    let currentWeapon = inventory.shift();
    currentWeapon-=1;
    gold+=30;
    goldText.innerText = gold;
    inventory.pop;
    text.innerText = "You sold your " + currentWeapon + ".\n";
    text.innerText = "Inventory : " + inventory;
  }
  else
  {
    text.innerText = "You only have one weapon!";
  }
}

function goCave(){
  console.log("Going to cave...")
  update(locations[2])
}






