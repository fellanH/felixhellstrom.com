.PHONY: build seed check preview clean

build:
	python src/generate.py

seed:
	rm -f src/content.db
	sqlite3 src/content.db < src/db/schema.sql
	sqlite3 src/content.db < src/db/seed.sql
	python src/generate.py

check:
	python src/check.py

preview:
	python -m http.server 8000 -d dist

clean:
	rm -rf dist/ src/content.db
