# Команда для установки зависимостей
install:
	npm ci

# Команда для сборки проекта в production режиме
build:
	npm run build

# Команда для локального сервера разработки (например, Webpack Dev Server)
serve:
	npx webpack serve

# Команда для линтинга
lint:
	npx eslint .

# Команда для сборки CSS
build-css:
	npm run build-css

# Команда для наблюдения за изменениями CSS
watch-css:
	npm run watch-css