# Humans vs. Zombies

Humans vs. Zombies (HvZ) is a game of tag played at schools, camps, neighborhoods, libraries, and conventions around the world. The game simulates the exponential spread of a fictional zombie infection through a population. This application creates the base for the games to playing in the real world.

The backend source code can be found at https://github.com/maijahaka/humans-vs-zombies-backend.

## Contributors

[Maija Haka](https://github.com/maijahaka), [Okko Partanen](https://github.com/okarp) and [Satu Heikkonen](https://github.com/Satuhoo)

## Usage

The application can be used at [humans-vs-zombies.vercel.app](https://humans-vs-zombies.vercel.app/)

User manual: https://github.com/Satuhoo/humans-vs-zombies-frontend/blob/master/public/assets/hvz_userguide.pdf

## Pages

### Landing page

Landing page contains a list of all games and the overview of the HvZ game. Each game listed display the name and description of the game, game state and amount of the players in the game. These are shown for all users.

In addition to this, admin can create a new game by using the 'add game'- button which opens the form where admin can type the game details, change the game rules and set the game location from the map.

### Game Details page

**Game states:** Registration, In progress or Complete  

**Player states:** Human or Zombie  

**User roles:** User or Admin  

Game Details page requires the authentication. If the game is clicked in the Landing page and user has not logged in, the application redirects to the keycloak’s login page. 
There are multiple different views in the game details page, by depending about the game’s state, player’s state, user’s role and if the user has registered to the game. All authenticated users can see the basic details of the game and the map.

If the user has not player in the game, the page shows the registration form. It contains player name field and ‘Join’ button. During the registration the application creates new player object for the user to the current game. Registration form is hidden if the game has already started.

After registration players can see the chat and the information text: ‘game is not started’. In addition to this, admin can see the admin bar which contains buttons to change game’s state to next possible state and edit or delete the game.

When admin starts the game, the application selects randomly the Original Zombie of all the players in the game. After that the page shows to human players their unique Bite Codes and for zombies the form where to enter these codes. The application checks the entered code and creates new kill if code is correct or return error if it is not. After successful kill a gravestone appears to the map and the victim’s player status changes to zombie.

Game is completed when the admin finishes it by clicking the ‘end game’ button. When game’s state is completed, the game details page shows data of the course of the game.

## Limitations

The following functionalities are left out of the application requirements because of the time limitation. These functionalities are in this README for the possible further development.

**Squads**

Squads would be the smaller groups inside of the game. After registration in the squad, it would display the names, relative ranks and state of each of the members of your squad. 

**Missions**

On longer games there could be safe zones in the game area. The admin would create missions and add mission markers to the map to get players out of the safe zone.

**Admin chat**

In the current version of application admin can see all messages, but only write to the global chat. In the next versions, admin could have a chance to send messages also to human or zombie chat.

## Installation

See the **backend installation** at https://github.com/maijahaka/humans-vs-zombies-backend.

**Frontend installation**

Clone the source code:
`git clone https://github.com/Satuhoo/humans-vs-zombies-frontend.git`

Move to the project folder:
`cd humans-vs-zombies-frontend`

Install dependencies:
`npm install`

Run the app in the development mode:
`npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Environment variables can be found  on env.development and .env.production files in the root folder. You can edit them as needed.

