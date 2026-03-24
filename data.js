// ═══════════════════════════════════════════════════
// data.js — Chat conversation data & song list
// Song titles auto-fetch from YouTube oEmbed on load
// ═══════════════════════════════════════════════════

var CS = {
  "s0": {
    "h": "Van! Nakita mo na ba? Ano masasabi mo? Excited na akong malaman ang reaction mo. Hehe 💙",
    "vc": [
      "Hatsuki... Naiyak talaga ako. Hindi ko ito inaasahan. 😢",
      "Grabe ka naman. Ang dami mong effort. Kilig na kilig ako! 😊",
      "Uy! Ang ganda ng website! Bakit mo ginawa ito? 😮"
    ]
  },
  "s1": {
    "rs": {
      "Hatsuki... Naiyak talaga ako. Hindi ko ito inaasahan. 😢":
        "Van... Okay lang yakapin kita kahit dito sa chat? Gusto ko lang malaman na nasa iyo ang bawat salita doon. Lahat ng iyon — totoo. 💙",
      "Grabe ka naman. Ang dami mong effort. Kilig na kilig ako! 😊":
        "Para sa iyo naman lahat iyon eh. Hehe Basta kilig ka, okay na ako. Worth it ang lahat! 💙",
      "Uy! Ang ganda ng website! Bakit mo ginawa ito? 😮":
        "Kasi deserve mo iyon, Van. 25 months ng pinili kita — gusto ko lang ipakita na hindi ko inuubos ang bawat sandali natin. Ikaw ang dahilan ng lahat ng ito. 💙"
    },
    "vc": [
      "Hatsuki... Mahal kita. Salamat sa lahat ng ito. 💕",
      "Seryoso? Totoo lahat ng nakasulat doon? 🥺",
      "Ang laki ng effort mo. Natutuwa talaga ako. 😊"
    ]
  },
  "s2": {
    "rs": {
      "Hatsuki... Mahal kita. Salamat sa lahat ng ito. 💕":
        "Mahal din kita Van. Mas mahal pa nga kaysa sa alam mo. Hindi 'to magbabago — kahit anong mangyari, ikaw pa rin ang sagot ko. 💙",
      "Seryoso? Totoo lahat ng nakasulat doon? 🥺":
        "Lahat — bawat salita, bawat linya. Hindi iyon para sa pabango. Iyon ang totoo. Ang nararamdaman ko pa rin ngayon. 💙",
      "Ang laki ng effort mo. Natutuwa talaga ako. 😊":
        "At ikaw ang dahilan kung bakit worth it ang bawat effort. Para sa iyo, walang effort na malaki. Palagi. 💙"
    },
    "vc": [
      "Ano pa bang gusto mong sabihin sa akin ngayon? 💕",
      "Hindi ko pa rin mapaniwalaang ginawa mo ito para sa akin. 🥺",
      "25 months pala... parang kahapon lang. 😢"
    ]
  },
  "s3": {
    "rs": {
      "Ano pa bang gusto mong sabihin sa akin ngayon? 💕":
        "Na kahit sa 25th buwan, piliin mo pa rin akong mahalin. Na bawat araw, handa akong maging mas mabuting tao para sa iyo. At na salamat — sobrang salamat sa lahat ng 25 months. 💙",
      "Hindi ko pa rin mapaniwalaang ginawa mo ito para sa akin. 🥺":
        "Paniwalaan mo, Van. Deserve mo iyon at mas pa. Wag kang mag-alala — marami ka pang darating na bagay na ipapakita ko sa iyo na worth it ka. 💙",
      "25 months pala... parang kahapon lang. 😢":
        "Parang kahapon lang tayo nag-umpisa — pero parang kasama mo na kita habang buhay. Ganyan ka sa akin, Van. Home. Lagi. 💙"
    },
    "vc": [
      "Mahal kita, Hatsuki. 25 months at palagi. ❤️",
      "Hindi kita kayang iwanan, alam mo yon? 💕",
      "Maraming salamat sa lahat. Lagi kang espesyal sa akin. 💙"
    ]
  },
  "s4": {
    "rs": {
      "Mahal kita, Hatsuki. 25 months at palagi. ❤️":
        "Mahal din kita, Van. 25 months down — at lahat ng kabanata pa pagkatapos nito. Hanggang sa susunod na monthsary — at sa lahat ng darating. 💙❤️",
      "Hindi kita kayang iwanan, alam mo yon? 💕":
        "Alam ko. At hindi rin kita kailanman iiwan. Nandito lang ako — ngayon, bukas, lagi. Chapter 26 na tayo. 💙",
      "Maraming salamat sa lahat. Lagi kang espesyal sa akin. 💙":
        "Sapat na iyon para sa akin, Van. Ikaw din — lagi at palagi. Hanggang sa susunod na 25 months. 💙❤️"
    },
    "end": true
  }
};

var HV_SONGS = [
  { id:"lY5V4hSLWY8", icon:"💙", title:"Perfect", artist:"Ed Sheeran" },
  { id:"GxldQ9eX2wo", icon:"⭐", title:"All of Me", artist:"John Legend" },
  { id:"uxWOTxYvorE", icon:"💜", title:"Photograph", artist:"Ed Sheeran" },
  { id:"oFCy3vEIAQk", icon:"🌿", title:"A Thousand Years", artist:"Christina Perri" },
  { id:"lk5Tg6RB5ew", icon:"🔥", title:"Can't Help Falling in Love", artist:"Elvis Presley" },
  { id:"1nMngf0nUOs", icon:"❄", title:"Lucky", artist:"Jason Mraz ft. Colbie Caillat" },
  { id:"gbaOm2ih-Bs", icon:"✦", title:"Beyond", artist:"Leon Bridges" },
  { id:"sOXXnbS8jmQ", icon:"💧", title:"You Are The Reason", artist:"Calum Scott" },
  { id:"4m-7p-bfUFs", icon:"🌺", title:"Thinking Out Loud", artist:"Ed Sheeran" },
  { id:"Vn1eW9grhLc", icon:"🌈", title:"Make You Feel My Love", artist:"Adele" },
  { id:"dCWMpvzMM1Y", icon:"🌙", title:"Song 11", artist:"Loading..." },
  { id:"exi6u6Gp5nE", icon:"💫", title:"Song 12", artist:"Loading..." },
  { id:"zQIu1V1ZzC4", icon:"🌸", title:"Song 13", artist:"Loading..." },
  { id:"jI7YL5xxPgA", icon:"💕", title:"Song 14", artist:"Loading..." }
];
