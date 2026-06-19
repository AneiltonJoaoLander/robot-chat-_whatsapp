const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
  /*remover sem 24 hr por dia */ puppeteer: {
    executablePath: "/usr/bin/google-chrome-stable",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Escaneie o qr code com o whatsapp");
});

client.on("ready", () => {
  console.log("online");
});

client.on("message", async (msg) => {
  const chat = await msg.getChat();
  const userMessage = msg.body.trim();

  const menuText =
    `OLÁ SEJA BEM-VINDO AO NOSSO ATENDIMENTO AUTOMATICO🤖. v2.0\n\n` +
    `DIGITE O NÚMERO DO ATENDIMENTO:\n\n` +
    `*1* - FALAR COM VENDAS💲\n\n` +
    `*2* - FALAR COM SUPORTE👨‍🦲\n\n` +
    `*10* - SOBRE A TECNOLOGIA🤖\n\n`;

  const menu1Text =
    `O QUE DESEJA SOBRE VENDAS?\n\n` +
    `DIGITE O NÚMERO PARA A VENDA:\n\n` +
    `*3* - ROUPAS COM ESTAMPAS👕🩱\n\n` +
    `*4* - TOALHAS DO ATELIÊ🧵\n\n` +
    `*5* - BOLSAS DO ATELIÊ👝\n\n` +
    `*6* - OUTROS - KITS🆔\n\n`;

  const menu2Text =
    `QUAL SEU PROBLEMA?\n\n` +
    `DIGITE O NÚMERO PARA SUPORTE:\n\n` +
    `*7* - ESTOQUE📦\n\n` +
    `*8* - FINANCEIRO💲\n\n` +
    `*9* - OUTROS🆔`;

  const menu3Text =
    `QUAL SUA DÚVIDA SOBRE O ROBÔ\n\n` +
    `DIGITE O NÚMERO PARA A DÚVIDA:\n\n` +
    `*11* - ALGUM ERRO DE ESCRITA OU DIGITAÇÃO NO SOFTWARE🔴\n\n` +
    `*12* - ERRO DE MENSAGEM❌\n\n` +
    `*13* - OUTRO🆔`;

  if (
    userMessage.toLowerCase() === "ia" ||
    userMessage.toLowerCase() === "menu"
  ) {
    return client.sendMessage(msg.from, menuText);
  }

  switch (userMessage) {
    case "1":
      await client.sendMessage(msg.from, menu1Text);
      break;
    case "2":
      await client.sendMessage(msg.from, menu2Text);
      break;
    case "3":
      await client.sendMessage(
        msg.from,
        "POR GENTILEZA, *MANDE AS FOTOS DAS ROUPAS QUE ESCOLHEU* E AGUARDE O ATENDENTE.",
      );
      break;
    case "4":
      await client.sendMessage(
        msg.from,
        "POR GENTILEZA, *MANDE AS FOTOS DAS TOALHAS QUE ESCOLHEU* E AGUARDE O ATENDENTE.",
      );
      break;
    case "5":
      await client.sendMessage(
        msg.from,
        "POR GENTILEZA, *MANDE AS FOTOS DAS BOLSAS QUE ESCOLHEU* E AGUARDE O ATENDENTE.",
      );
      break;
    case "6":
      await client.sendMessage(
        msg.from,
        "POR GENTILEZA, *MANDE AS FOTOS DOS KITS OU OS PRODUTOS QUE ESCOLHERAM* E AGUARDE O ATENDENTE.",
      );
      break;
    case "7":
      await client.sendMessage(
        msg.from,
        "QUAL FOI O PROBLEMA COM ESTOQUE? *AGUARDE O ATENDENTE!*",
      );
      break;
    case "8":
      await client.sendMessage(
        msg.from,
        "QUAL FOI O PROBLEMA NA HORA DE PAGAR? *AGUARDE O ATENDENTE!*",
      );
      break;
    case "9":
      await client.sendMessage(
        msg.from,
        "QUAIS SÃO OS PROBLEMAS QUE PRECISA RESOLVER? *AGUARDE O ATENDENTE!*",
      );
      break;
    case "10":
      await client.sendMessage(msg.from, menu3Text);
      break;
    case "11":
      await client.sendMessage(
        msg.from,
        "POR GENTILEZA, *PODE DIZER O ERRO DE ESCRITA E DIGITAÇÃO DO SOFTWARE.*",
      );
      break;
    case "12":
      await client.sendMessage(
        msg.from,
        "POR GENTILEZA, *PODE DIZER O ERRO NA HORA DE MANDAR MENSAGEM.*",
      );
      break;
    case "13":
      await client.sendMessage(
        msg.from,
        "POR GENTILEZA, *DIGA O ERRO OU O QUE TEM PARA FALAR SOBRE NOSSO SOFTWARE.*",
      );
      break;
    default:
      if (!chat.isGroup) {
      }
      break;
  }
});

client.initialize();
