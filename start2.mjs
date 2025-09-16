#!/usr/bin/env node
import { execa } from "execa";
import path from "path";

async function main() {
  const projectDir = path.resolve();

  try {
    let tunnelUrl = "http://localhost:80/";

    if (!tunnelUrl) {
      console.error("❌ Не удалось получить URL");
      process.exit(1);
    }

    console.log("→ Starting backend and bot containers with WEBAPP_URL env...");
    await execa(
      "docker-compose",
      ["up", "-d", "--build", "cot-backend", "webapp", "nginx"], //
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
  } catch (err) {
    console.error("❌ Ошибка в процессе запуска:", err);
    process.exit(1);
  }
}

main();
