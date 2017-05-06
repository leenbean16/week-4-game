var charSelected = false;
var defenderSelected = false;
var char = {};
var defender = {};
var enemiesDefeated = 0;
gameOver = false;
// chars
var jane = {
  name: "jane",
  health: 120,
  baseAttack: 8,
  attack: 8
};
var george = {
  name: "george",
  health: 100,
  baseAttack: 5,
  attack: 5
};
var judy = {
  name: "judy",
  health: 150,
  baseAttack: 20,
  attack: 20
};
var baby = {
  name: "baby",
  health: 180,
  baseAttack: 25,
  attack: 25
};
// get char funtion
function getchar(chosenchar) {
  char.name = chosenchar.name;
  char.health = chosenchar.health;
  char.baseAttack = chosenchar.baseAttack;
  char.attack = chosenchar.attack;
}
// get enemy function
function getDefender(chosenDefender) {
  defender.name = chosenDefender.name;
  defender.health = chosenDefender.health;
  defender.baseAttack = chosenDefender.baseAttack;
  defender.attack = chosenDefender.attack;
}
// move to enemies
function moveToEnemies() {
  $(".available-char").removeClass("available-char").addClass("enemy-char");
  $("#enemies-available").append($(".enemy-char"));
}
// reset game
function resetGame() {
  $("#jane-char").children(".health").html(jane.health);
  $("#george-char").children(".health").html(george.health);
  $("#judy-char").children(".health").html(judy.health);
  $("#baby-char").children(".health").html(baby.health);
  $(".char-image").removeClass("chosen-char enemy-char defender-char").addClass("available-char");
  
  var available = $(".available-char").show();
  $("#chars-available").html(available);
  $("#game-message").empty();
  $("#restart").hide();

  charSelected = false;
  defenderSelected = false;
  enemiesDefeated = 0;
  gameOver = false;
  char = {};
  defender = {};
}

$(document).ready(function() {
// hide restart
  $("#restart").hide();
// determine char
  $("#jane-char").on("click", function () {
    console.log("jane is selected");
// user pics char
    if(charSelected == false) {
      $("#game-message").empty();
// users char
      getchar(jane);
      charSelected = true;
// display
      $("#jane-char").removeClass("available-char").addClass("chosen-char");
      $("#chosen-char").append(this);
// move to enemies section
      moveToEnemies();
    } else if ((charSelected == true) && (defenderSelected == false)) {
// choose defender
      if($("#jane-char").hasClass("enemy-char")) {
        $("#game-message").empty();
// set enemy
        getDefender(jane);
        defenderSelected = true;
// add to defender section
        $("#jane-char").removeClass("enemy-char").addClass("defender-char");
        $("#defender-section").append(this);
      }
    }
  });

  $("#george-char").on("click", function () {
    console.log("george is selected");
// choose char
    if(charSelected == false) {
      $("#game-message").empty();
// set char
      getchar(george);
      charSelected = true;
// display char
      $("#george-char").removeClass("available-char").addClass("chosen-char");
      $("#chosen-char").append(this);
// move to enemies section
      moveToEnemies();
    } else if ((charSelected == true) && (defenderSelected == false)) {
// choose defender
      if($("#george-char").hasClass("enemy-char")) {
        $("#game-message").empty();
// set enemy
        getDefender(george);
        defenderSelected = true;
// add to defender section
        $("#george-char").removeClass("enemy-char").addClass("defender-char");
        $("#defender-section").append(this);
      }
    }
  });

  $("#judy-char").on("click", function () {
    console.log("judy is selected");
// choose char
    if(charSelected == false) {
      $("#game-message").empty();
// set char
      getchar(judy);
      charSelected = true;
// display char
      $("#judy-char").removeClass("available-char").addClass("chosen-char");
      $("#chosen-char").append(this);
// move to enemies
      moveToEnemies();
    } else if ((charSelected == true) && (defenderSelected == false)) {
// choose defender
      if($("#judy-char").hasClass("enemy-char")) {
        $("#game-message").empty();
// set enemy
        getDefender(judy);
        defenderSelected = true;
// add to defender section
        $("#judy-char").removeClass("enemy-char").addClass("defender-char");
        $("#defender-section").append(this);
      }
    }
  });

  $("#baby-char").on("click", function () {
    console.log("baby is selected");
// choose char
    if(charSelected == false) {
      $("#game-message").empty();
// set char
      getchar(baby);
      charSelected = true;
// display char
      $("#baby-char").removeClass("available-char").addClass("chosen-char");
      $("#chosen-char").append(this);
// move to enemies
      moveToEnemies();
    } else if ((charSelected == true) && (defenderSelected == false)) {
// choose defender
      if($("#baby-char").hasClass("enemy-char")) {
        $("#game-message").empty();
// set enemy
        getDefender(baby);
        defenderSelected = true;
// add to defender section
        $("#baby-char").removeClass("enemy-char").addClass("defender-char");
        $("#defender-section").append(this);
      }
    }
  });

  $("#attack").on("click", function() {
    console.log("Attack selected");
// attack defender
    if (charSelected && defenderSelected && !gameOver) {
// decreare points
      defender.health = defender.health - char.attack;
      $(".defender-char").children(".health").html(defender.health);
      $("#game-message").html("<p>You attacked " + defender.name + " for " + char.attack + " damage.<p>");
// increase power
      char.attack = char.attack + char.baseAttack;
// counter attack if alive
      if (defender.health > 0) {
        char.health = char.health - defender.baseAttack;
        $(".chosen-char").children(".health").html(char.health);
// survivor?
        if (char.health > 0) {
          $("#game-message").append("<p>" + defender.name + " attacked you back for " + defender.baseAttack + " damage.</p>");
        } else {
          gameOver = true;
          $("#game-message").html("<p>Loser... </p><p>Play again?</p>");
          $("#restart").show();
        }
      } else {
// lost game.
        enemiesDefeated++;
        defenderSelected = false;
        $("#game-message").html("<p>You beat " + defender.name + ". Pick another enemy.</p>");
        $(".defender-char").hide();
// won game?
        if (enemiesDefeated === 3) {
          gameOver = true;
          $("#game-message").html("<p>Winner!!!</p><p>Play again?</p>");
          $("#restart").show();
        }
      }
    } else if (!charSelected && !gameOver) {
      $("#game-message").html("<p>Select your character.</p>");
    } else if (!defenderSelected && !gameOver) {
      $("#game-message").html("<p>Pick an enemy.</p>");
    }

    console.log("char = " + (char));
    console.log("defender = " + (defender));
  });

  $("#restart").on("click", function() {

    resetGame();
  });

});
