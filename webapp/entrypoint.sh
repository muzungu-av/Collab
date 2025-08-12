#!/bin/sh
set -e

# Подставляем API_BASE_URL в index.html
if [ -n "$API_BASE_URL" ]; then
  sed -i "s|{{API_BASE_URL}}|${API_BASE_URL}|g" /usr/share/nginx/html/index.html
else
  echo "⚠️ API_BASE_URL не задан — оставляю плейсхолдер"
fi

exec "$@"
