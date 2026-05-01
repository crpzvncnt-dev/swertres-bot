const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

function generate() {
  const hot = [5,7,0,2];
  const mid = [1,3,4,9];
  const cold = [6,8];

  function pick() {
    const pool = [
      hot[Math.floor(Math.random()*hot.length)],
      mid[Math.floor(Math.random()*mid.length)],
      cold[Math.floor(Math.random()*cold.length)]
    ];

    return pool.sort(() => Math.random() - 0.5).join("");
  }

  return {
    primary: [pick(), pick(), pick()],
    secondary: [pick(), pick()]
  };
}

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id,
`🧠 Swertres Bot Ready

Type:
/now - generate numbers`);
});

bot.onText(/\/now/, (msg) => {
  const data = generate();

  bot.sendMessage(msg.chat.id,
`📊 SWERTRES PICKS

PRIMARY:
${data.primary.join(", ")}

SECONDARY:
${data.secondary.join(", ")}

⚠️ Simulation only`);
});

console.log("Bot running...");
