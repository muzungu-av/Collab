#!/usr/bin/env node
import { execa } from "execa";
import path from "path";
import localtunnel from "localtunnel";

async function main() {
  const projectDir = path.resolve();

  try {
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    // console.log("→ Starting webapp container...");
    // await execa("docker-compose", ["up", "-d", "--build", "webapp"], {
    //   cwd: projectDir,
    //   stdio: "inherit",
    // });

    console.log("→ Starting localtunnel process...");
    // Запускаем localtunnel с указанием порта 3000, читаем stdout чтобы получить URL
    const ltProc = execa("npx", ["localtunnel", "--port", "3000"], {
      cwd: projectDir,
      stdio: ["ignore", "pipe", "inherit"],
    });

    let tunnelUrl = null;

    // Читаем вывод localtunnel чтобы получить URL
    for await (const chunk of ltProc.stdout) {
      const text = chunk.toString();
      // localtunnel выводит что-то типа:
      // "your url is: https://some-name.loca.lt"
      const m = text.match(/your url is: (https:\/\/[^\s]+)/i);
      if (m) {
        tunnelUrl = m[1];
        console.log("****************************");
        console.log(`→ Detected WEBAPP_URL=${tunnelUrl}`);
        console.log("****************************");
        break;
      }
    }

    if (!tunnelUrl) {
      console.error("❌ Не удалось получить URL из localtunnel");
      process.exit(1);
    }
    //docker build --build-arg VITE_API_BASE_URL=https://your-backend-url.com -t your-app .
    console.log("→ Starting backend and bot containers with WEBAPP_URL env...");
    await execa(
      "docker-compose",
      ["up", "-d", "--build", "bot", "cot-backend", "webapp"],
      {
        cwd: projectDir,
        stdio: "inherit",
        env: {
          ...process.env,
          WEBAPP_URL: tunnelUrl,
        },
      }
    );
    //контейнер webapp не получит WEBAPP_URL (можно сделать после) он узнает URL из запроса
    console.log("→ All services started successfully!");

    // Можно оставить localtunnel запущенным, чтобы туннель не закрывался
    // Для этого не закрываем ltProc
    // Если хочешь завершить localtunnel вместе со скриптом — добавь обработчик
  } catch (err) {
    console.error("❌ Ошибка в процессе запуска:", err);
    process.exit(1);
  }
}

main();
