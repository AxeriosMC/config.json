const mineflayer = require('mineflayer');
const fs = require('fs');

let config;
try {
  config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
} catch (err) {
  console.error("config.json bulunamadı veya hatalı:", err);
  process.exit(1);
}

let bot = mineflayer.createBot({
  host: config.server,
  username: config.username,
  password: config.password
});

bot.on('login', () => {
  console.log('Bot sunucuya bağlandı!');
  if (config.commands && Array.isArray(config.commands)) {
    config.commands.forEach(cmd => bot.chat(cmd));
  }
});

bot.on('error', err => console.log('Hata:', err));

bot.on('end', () => {
  console.log('Bot sunucudan ayrıldı, yeniden bağlanıyor...');
  setTimeout(() => {
    bot = mineflayer.createBot({
      host: config.server,
      username: config.username,
      password: config.password
    });
  }, 5000);
});
