/* ==========================================================================
   GAME DATA
   This is the single source of truth for the hub. To add a game, push a
   new object onto this array — the grid, chips, quick-jump menu
   and detail carousel all update automatically. No other code needs to
   change.

   Fields:
     id          unique string/number
     title       display name
     short_desc  short blurb (1–2 sentences) — shown on the grid card
     long_desc   longer blurb (2–4 sentences) — shown in the detail modal
     categories  array of one or more category names — used for filter
                 chips and accent color grouping. A game can
                 belong to several, e.g. ["Multiplayer", "Strategy"].
                 The first entry is treated as the primary category and
                 sets the card's accent color.
     image       cover art URL — shown large on the grid card, in the
                 quick-jump menu, and as the hero image in the detail
                 modal. Currently placeholder.co images; swap in real
                 artwork per game whenever it's ready.
     url         where the modal's "Play" button should navigate to
     players     e.g. "1P", "1–2P", "1–4P"
     disabled    optional boolean — when true, the game is hidden
                 entirely from the grid, chips, quick-jump nav,
                 and detail carousel
   ========================================================================== */
const GAMES = [
  {
    id: "drinking_levels",
    title: "Drinking Levels",
    short_desc: "Drink = Exp",
    long_desc: "<p>Unfortunately this game is no longer supported due to addition cost of features unavailable in the free tier of hosting</p><p>Ever feel like your drinks should matter for something? Really enjoy RPG games? Turn those drinks into XP! In this \"game\" you create a profile (you can create multiple profiles for multiple events) and whenever you finish a drink, submit that drink and get XP for it by ABV. So your 5% ABV beer gives you 5xp, that 18% ABV shot of rum gives 18xp. Like mixers? We (will) have an easy calculator to determin ABV</p> <br> <p>This game is in beta status. The core features are done but still needs more content. Bugs and glitches are less likely but can occur, please report any if found. I can't fix what I don't know is broke.</p>",
    categories: ["Social"],
    image: "images/Logos/drinking_levels.svg",
    url: "#",
    players: "1P",
    disabled: true
  },
  {
    id: "wheel_of_misfortune",
    title: "Wheel of Misfortune",
    short_desc: "Spin a wheel, enjoy the outcome",
    long_desc: "<p>A fun beginning of the night game. As its name suggests, you spin a wheel and enjoy the misfortune. You may have to drink, give a drink, take a dare, the possibilities are near endless as you can use our defaults or (eventually) enter your own wheel challenges.<br><br>Now with 50+ options!</p>",
    categories: ["Social","Icebreaker"],
    image: "images/Logos/wheel_of_misfortune.svg",
    url: "Games/WheelOfMisfortune/",
    players: "2P+",
    disabled: false
  },
  {
    id: "drunk_artist",
    title: "Drunk Artist",
    short_desc: "Draw bad pictures and have fun",
    long_desc: "<p>Ever wonder if you have a hidden talent that only comes out when drunk? Well find out if it is art here! 1 person is given an image and must tell all other players how to draw it. Catch is the artists can't see their art, they must remember what they drew and where. Drinking comes into play when guessing their art. Always fun to compare art to eachother and the original piece.</p>",
    categories: ["BestWithFriends"],
    image: "images/Logos/drunk_artist.svg",
    url: "#",
    players: "2P+",
    disabled: false
  },
  {
    id: "drinkup_tv",
    title: "DrinkUp TV",
    short_desc: "Better Multiplayer Games",
    long_desc: "<p>Secondary hub for multiplayer DrinkUp games. A host on the tv and all other players join on their own phone. Similiar to how the Jackbox Party Pack games work.</p>",
    categories: ["Social"],
    image: "images/Logos/tv.svg",
    url: "#",
    players: "2P+",
    disabled: true
  },
  {
    id: "memory",
    title: "Memory",
    short_desc: "It's Memory",
    long_desc: "<p>Just like the childrens game but with alcohol. A grid is layed before you of facedown cards. You must pick 2 cards and if they match remove them from the game and give a the drink the match says, and go again. If they differ, take the drink, turn them back face down, and it's the next players turn to pick. Sometimes there's multiple matches for a set of cards.</p>",
    categories: ["Casual"],
    image: "images/Logos/memory.svg",
    url: "#",
    players: "2P+",
    disabled: false
  },
  {
    id: "memory2",
    title: "Memory 2",
    short_desc: "Alternative Memory",
    long_desc: "<p>An alternate form of Memory. 12 cards will be shown to you. You have 5 seconds to memorize them before being flipped over. Then, the center large card will be revealed. It is your job to flip over the matching tile.</p>",
    categories: ["Casual"],
    image: "images/Logos/memory2.svg",
    url: "#",
    players: "2P+",
    disabled: false
  },
  {
    id: "scratch_n_drink",
    title: "Scratch N Drink",
    short_desc: "Competitive lucky lottery drinking",
    long_desc: "<p>Best played with 2-3 people and a shot. A grid of covered tiles is layed before you, each player takes a turn and scratches off a tile to reveal what is underneath. Based upon the revealed tile, that player may have to drink 1, 2, go again, or be safe (do nothing). BUT, theres the crossbones. The player that reveals that has to take the shot and a new game can be started with a new shot. When playing with more than 2 people it is recomended to incease the crossbone count so when one player scratches it off the others can keep going on the same game.</p>",
    categories: ["Shots"],
    image: "/images/Logos/scratch_n_drink.svg",
    url: "/Games/ScratchNDrink/",
    players: "2P",
    disabled: false
  },
  {
    id: "campfile_stories",
    title: "Campfire Stories",
    short_desc: "placeholder",
    long_desc: "<p>Inspired by Comedy Central's Drunk History, you're given a random topic and a few key facts. Your job is to tell the history of this event. For Example, you may have</p><p>Tell the history of the First Person in Space</p><ul><li>Yuri Gagarin was the first person is space</li><li>Occured April 12, 1961</li><li>Rocket was called Vostok 1</li><li>Mission successful after an 89 minute run</li></ul><p>You fill in the rest from there, probably very innacurate. (Don't forget the intro) \"Hello, I'm Hugh Jass and today we'll be discussing the first person in space. Yuri Gagarin was born in 1947 to Phil and Mary Gagarin somewhere in Sweden (not true). As a young boy Yuri was fasinated with space (possibly true) and would grow up to be the first person in space (true)...\" Let your imagination run free, nobody is fact checking you on this. This game is best played later in the night when more people are already drunk. Not recomended to play with actual historians.</p>",
    categories: ["Puzzle"],
    image: "images/Logos/campfire_stories.svg",
    url: "#",
    players: "1P",
    disabled: true
  },
  {
    id: "battleshot",
    title: "Battleshot",
    short_desc: "Battleship, but with shots",
    long_desc: "<p>Based on the board game Battleship. 2 player lay out drinks on a board and take turns guessing where their opponents drinks are. If they guess right, your opponent drinks. If wrong, next players turn and hope they guess wrong too.</p>",
    categories: ["Shots"],
    image: "images/Logos/battleshot.svg",
    url: "#",
    players: "2P",
    disabled: false
  }
];

/* Accent color per category — extend this if you add new categories */
const CATEGORY_COLORS = {
  Social: "#6d5bf5",
  BestWithFriends: "#1fa971",
  Strategy: "#d9911f",
  Action: "#e0507a",
  Icebreaker: "#2f9bd9",
  Multiplayer: "#e0722f",
  Shots: "#a37020"
};
