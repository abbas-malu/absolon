const qrcode = require("qrcode-terminal");
const fs = require("fs");
const { Client, List } = require("whatsapp-web.js");
const fetch = require("node-fetch");
const { MessageMedia } = require("whatsapp-web.js");

// const data = {
//   coord: {
//     lon: 75.8333,
//     lat: 22.7179,
//   },
//   weather: [
//     {
//       id: 804,
//       main: "Clouds",
//       description: "overcast clouds",
//       icon: "04n",
//     },
//   ],
//   base: "stations",
//   main: {
//     temp: 298.72,
//     feels_like: 299.53,
//     temp_min: 298.72,
//     temp_max: 298.72,
//     pressure: 1002,
//     humidity: 84,
//     sea_level: 1002,
//     grnd_level: 942,
//   },
//   visibility: 8915,
//   wind: {
//     speed: 3.11,
//     deg: 213,
//     gust: 6.46,
//   },
//   clouds: {
//     all: 96,
//   },
//   dt: 1657987612,
//   sys: {
//     country: "IN",
//     sunrise: 1657930846,
//     sunset: 1657979052,
//   },
//   timezone: 19800,
//   id: 1269743,
//   name: "Indore",
//   cod: 200,
// };

//                              _ _            _
//                             | (_)          | |
//   _ __   _____      __   ___| |_  ___ _ __ | |_
//  | '_ \ / _ \ \ /\ / /  / __| | |/ _ \ '_ \| __|
//  | | | |  __/\ V  V /  | (__| | |  __/ | | | |_
//  |_| |_|\___| \_/\_/    \___|_|_|\___|_| |_|\__|

const client = new Client();

// ____  _____     _____ ____  _____  ______
// / __ \|  __ \   / ____/ __ \|  __ \|  ____|
// | |  | | |__) | | |   | |  | | |  | | |__
// | |  | |  _  /  | |   | |  | | |  | |  __|
// | |__| | | \ \  | |___| |__| | |__| | |____
// \___\_\_|  \_\  \_____\____/|_____/|______|

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// _____  ______          _______     __
// |  __ \|  ____|   /\   |  __ \ \   / /
// | |__) | |__     /  \  | |  | \ \_/ /
// |  _  /|  __|   / /\ \ | |  | |\   /
// | | \ \| |____ / ____ \| |__| | | |
// |_|  \_\______/_/    \_\_____/  |_|

client.on("ready", () => {
  console.log("Client is ready!");
});

// __  __ _____  _____  _____
// |  \/  |_   _|/ ____|/ ____|
// | \  / | | | | (___ | |
// | |\/| | | |  \___ \| |
// | |  | |_| |_ ____) | |____
// |_|  |_|_____|_____/ \_____|
// misc functions and variable defination and declaration
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
let media = MessageMedia.fromFilePath(`bot.jpg`);
let qry_word;
let url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=<qry_word>&utf8=&format=json";

//  __  __ ______  _____ _____         _____ ______
// |  \/  |  ____|/ ____/ ____|  /\   / ____|  ____|
// | \  / | |__  | (___| (___   /  \ | |  __| |__
// | |\/| |  __|  \___ \\___ \ / /\ \| | |_ |  __|
// | |  | | |____ ____) |___) / ____ \ |__| | |____
// |_|  |_|______|_____/_____/_/    \_\_____|______|
client.on("message", async (message) => {
  let greeting = message.body.toLowerCase().split(" ");
  // greeting message sender
  if (
    message.type != "list_response" &&
    message.from.toLowerCase().includes("g.us") == false &&
    (greeting.includes("hello") ||
      greeting.includes("salaam") ||
      greeting.includes("salam") ||
      // greeting.includes("hy") ||
      greeting.includes("hi", 0) ||
      greeting.includes("abbas") ||
      greeting.includes("hey") ||
      greeting.includes("help") ||
      greeting.includes("menu"))
  ) {
    client.sendMessage(
      message.from,
      new List(
        "How may i help you??☺☺",
        "Click Here👇👇",
        [
          {
            title: "Select from below",
            rows: [
              {
                id: "call",
                title: "📞Call To You",
                description: "Press here if u want sir to call u.",
              },
              {
                id: "chat",
                title: "Chat with sir.",
                description: "Press here to chat with sir.",
              },
              {
                id: "urgent",
                title: "Urgent",
                description: "Contact to sir urgently.",
              },
              {
                id: "About_Me",
                title: "About Me",
                description: "Know about Absolon.🤖",
              },
              {
                id: "test_ft",
                title: "Test Features",
                description: "Test Currently available features.",
              },
            ],
          },
        ],
        ".🤗Hello I m Absolon Abbas Sir's 👨‍⚖️ Personal Assitant"
      )
    );
  }

  // list response checker and reply
  if (message.type == "list_response") {
    if (message.selectedRowId == "chat") {
      message.react("👍");
      message.reply("Sir will chat with you soon.");
      client.sendMessage(
        "916232705352@c.us",
        `Sir please chat with ${message.from.replace("@c.us", "")}`
      );
    } else if (message.selectedRowId == "About_Me") {
      message.react("☺");
      client.sendMessage(message.from, media, {
        caption: `I am Absolon,
▪ I am a Bot🤖 programmed by 
▪ 👨‍⚖️ Mr.Abbas Malu At Anymakershub.
▪ Currently I am in testing phase.
▪ More features will be available soon.🥳

Have a good day!!!💝`,
      });
    } else if (message.selectedRowId == "urgent") {
      message.react("👍");
      message.reply("Wait, I am telling sir to talk with u right now.!!!");
      client.sendMessage(
        "916232705352@c.us",
        `Sir please talk with ${message.from.replace("@c.us", "")} urgently.`
      );
    } else if (message.selectedRowId == "test_ft") {
      message.react("👍");
      client.sendMessage(
        message.from,
        `Hey, You wanna try new features!!🥳🥳🥳

🔍 *Absolon Search Mania* 🔍
You can ask me to search for anything.
e.g. 'search for lion' or 'search for photosynthesis'

📕 *Absolon Dictonary Tycoon🤴🏻* 📕
Ask me for meaning of words.
e.g. 'what is the meaning of book' or 'meaning of crispy'

🌧 *Absolon Rainkist* 🌦⛈
Get weather details for cities.
e.g. 'weather in indore' or 'weather for new york'

Wait Wait!! More features soon.....⏳⌛
`
      );
    } else {
      message.react("👍");
      message.reply("Sir will call as soon as he will be free.");
      client.sendMessage(
        "916232705352@c.us",
        `Sir please call ${message.from.replace("@c.us", "")}`
      );
    }
  }

  // ______ ______ ______ ______ ______ ______ ______ ______ ______ ______
  //  |______|______|______|______|______|______|______|______|______|______|

  //   ______ ______       _______ _    _ _____  ______  _____
  //  |  ____|  ____|   /\|__   __| |  | |  __ \|  ____|/ ____|
  //  | |__  | |__     /  \  | |  | |  | | |__) | |__  | (___
  //  |  __| |  __|   / /\ \ | |  | |  | |  _  /|  __|  \___ \
  //  | |    | |____ / ____ \| |  | |__| | | \ \| |____ ____) |
  //  |_|    |______/_/    \_\_|   \____/|_|  \_\______|_____/
  let query_list = message.body.toLowerCase().split(" ");
  // console.log(query_list);
  // dictionary FEATURES
  if (query_list.includes("meaning")) {
    let index = query_list.indexOf("in");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("is");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("the");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("for");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("the");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("meaning");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("what");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("search");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("who");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }index = query_list.indexOf("of");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    qry_word = qry_word = qry_word = query_list.join(" ").trim();

    // fetch meaning response
    let results = "";
    let defCount = 0;
    let response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${qry_word}`
    );
    let data = await response.json();
    // console.log(data);
    if (data.title == undefined) {
      let meanings = data[0].meanings[0].definitions;
      meanings.forEach((element) => {
        if (element.example == undefined) {
          results += `\nDefination ${++defCount} : ${element.definition}\n`;
        } else {
          results += `\nDefination ${++defCount} : ${element.definition}
Example ${defCount} : ${element.example}\n`;
        }
      });
      message.react("👍");
      message.reply(results);
    } else {
      message.reply("No meaning found");
    }
  }

  // searching features
  else if (
    (query_list.includes("search") && query_list.includes("for")) ||
    (query_list.includes("what") && query_list.includes("is")) ||
    (query_list.includes("who") && query_list.includes("is"))
  ) {
    let index = query_list.indexOf("in");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("is");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("the");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("for");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("the");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("meaning");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("what");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("search");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("who");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    qry_word = qry_word = query_list.join(" ").trim();
    // console.log(qry_word);

    // fetch meaning response
    let results = "Heres's what i found for you: \n";
    let defCount = 0;
    let response = await fetch(url.replace("<qry_word>", qry_word));
    let data = await response.json();
    // console.log(data);
    // console.log(data.title)
    if (data.query.searchinfo.totalhits != 0) {
      let searchResults = data.query.search;
      searchResults.forEach((element) => {
        let desc = element.snippet
          .replace(/<span class="searchmatch">/g, " ")
          .replace(/<\/span>/g, " ");
        results += `*Title* : ${element.title}
*Description* : ${desc}\n\n`;
      });
      message.reply(results);
      message.react("👍");
    } else {
      message.reply("No search results found.");
      message.react("😔");
    }
  }

  // weather search
  else if (query_list.includes("weather")) {
    let index = query_list.indexOf("in");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("weather");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("is");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("the");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("for");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("the");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("meaning");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("what");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("search");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    index = query_list.indexOf("who");
    if (index > -1) {
      // only splice array when item is found
      query_list.splice(index, 1); // 2nd parameter means remove one item only
    }
    let qry_word = query_list.join(" ").trim();
    // console.log(qry_word);
    // fetch meaning response
    let results = "";
    let defCount = 0;
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${qry_word}&appid=70121c1eaf3d32f16cef18f3b0ee3b5c`
    );
    let data = await response.json();
    // console.log(data);
    if (data.cod == "200") {
      let weather_id = data.weather[0].id;
      let weather_emoji = "";
      if (weather_id > 199 && weather_id < 300) {
        weather_emoji = "🌩️🌩️🌩️";
      } else if (weather_id > 299 && weather_id < 400) {
        weather_emoji = "🌦️🌦️🌦️";
      } else if (weather_id > 499 && weather_id < 600) {
        weather_emoji = "🌧️🌧️🌧️";
      } else if (weather_id > 599 && weather_id < 700) {
        weather_emoji = "❄❄❄";
      } else if (weather_id > 699 && weather_id < 800) {
        weather_emoji = "🌞🌞🌞";
      } else if (weather_id > 800 && weather_id < 900) {
        weather_emoji = "☁️☁️☁️";
      } else {
        weather_emoji = "☀️☀️☀️";
      }
      let city = qry_word.charAt(0).toUpperCase() + qry_word.slice(1);
      results = `Weather of *${city}*
${data.weather[0].main} ${weather_emoji}
${data.weather[0].description}
Temprature : ${Math.round(data.main.temp - 273)} °C`;
      message.react(weather_emoji[0]);
      message.reply(results);
    } else {
      message.reply("invalid city.");
    }
  }
});

// ______ ______ ______ ______ ______ ______ ______ ______ ______ ______
//  |______|______|______|______|______|______|______|______|______|______|

client.initialize();
