/* ==========================================================================
   DEVLOG DATA
   Single source of truth for the Devlog page's expandable history list.
   To log a change, push a new object onto the front of this array (newest
   first) — the accordion on devlog.html updates automatically.

   Fields:
     date    "YYYY-MM-DD" — shown as the entry's date stamp
     title   short headline for the change/update
     body    HTML string shown when the entry is expanded — can include
             <p>, <ul><li>, etc.
   ========================================================================== */
const DEVLOG = [
  {
    date: "2026-09-10",
    title: "Theme Update",
    body: "<p>Several themes added for the users taste. Purely cosmetic, just affects colors and icons.</p>"
  },
  {
    date: "2026-09-02",
    title: "Official Version 3 Release",
    body: "<p>New name drinkup.games established and publicly released. So many updates to the overall design and feel of the site. Placeholder content removed, only show actually working games.</p>"
  },
  {
    date: "2026-07-21",
    title: "DrinkUp! Version 3 Started",
    body: "<p>Due to lack of free time, developer gives in to AI bubble and hates all of it. But it does help productivity and make the project go faster. AI is only used to manage CSS, Bootstrap, and the layout/design aspects of javascript. All game development is still painstakingly done manually. New DrinkUpAI project created to separate projects.</p>"
  },
  {
    date: "2025-2026",
    title: "Various Unmarked Updates",
    body: "<p>Various updates through the years. Don't have proper timestamps or archiving. Major life changes bring development to standstill. Just don't have the free time I used to.</p>"
  },
  {
    date: "2025-9-7",
    title: "Semi-Official Version 2 Release",
    body: "<p>Development was moved away from local pc and to Github, with the additional benefit of hosting through github pages for free. This did mean the loss of some games that used server side code but the pros outweighed the cons. Technically publicly available, only those directly connected to the developer knew how to access</p>"
  },
  {
    date: "2024",
    title: "Shutdown",
    body: "<p>DrinkUp!.wft was shutdown due to cost and inactivity. Webhosting was $10 per month + $40 annual domain name for no active players. Development continued locally but nothing publicly available</p>"
  },
  {
    date: "2022-2023",
    title: "Various Unmarked Updates",
    body: "<p>Various updates through the years. Don't have proper timestamps or archiving.</p>"
  },
  {
    date: "2021-10-26",
    title: "Official Version 1 Release",
    body: "<p>Grand opening of DrinkUp.wft. Self-promoted amound friends but publicly available to the world nonetheless. Featured first editions of games</p><ul><li>Drinking Levels</li><li>Wheel of Misfortune</li><li>Campfire Stories</li><li>Do or Drink</li><li>Jeopardy</li></ul><p>Plus a lot of placeholder future ideas</p>"
  },
  {
    date: "2021-09-21",
    title: "DrinkUp! Began",
    body: `<p>DrinkUp! was first created under the name drinkup.wtf. It started as the lead developer was sick and tired of "free" drinking apps. Where the app was free and maybe had 1-2 games but any expansion or other games were .99 cents each. Expecially when the games were so simple and not worth real money at all. It really only had 1 game, Drinking Levels, for a long time and a lot of placeholder ideas.</p>`
  }
];
