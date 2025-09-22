#!/bin/bash

# Функция для запуска скрипта в фоне (с отвязкой от терминала)
run_detached() {
    nohup "$@" > /dev/null 2>&1 &
    echo "✅ Запущено в фоне (PID: $!). Логи игнорируются."
    echo "   Чтобы остановить: pkill -f \"$1\""
}

# Меню выбора
echo "🚀 Выберите режим запуска:"
echo "1) start.mjs (с туннелем)"
echo "2) start2.mjs (без туннеля)"
echo "3) Выход"
read -p "Введите номер (1/2/3): " choice

case $choice in
    1)
        echo "🔧 Запускаю docker-compose down + start.mjs (с туннелем)..."
        run_detached bash -c "docker-compose -f docker-compose.yml down; node start.mjs"
        ;;
    2)
        echo "🔧 Запускаю docker-compose down + start2.mjs (без туннеля)..."
        run_detached bash -c "docker-compose -f docker-compose.yml down; node start2.mjs"
        ;;
    3)
        echo "❌ Выход."
        exit 0
        ;;
    *)
        echo "❌ Некорректный выбор. Выход."
        exit 1
        ;;
esac

exit 0
