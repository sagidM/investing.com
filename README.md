# Microservice for Investing.com

## Description

This microservice fetches the data from rapidapi -> yahoo-finance1 and stores it in a MySQL database.

The ranges for the stocks are: `1d, 5d, 3mo, 6mo, 1y, 5y, max`
## Run

```bash
cp .env.example .env
# Then edit .env as you like

docker-compose up --build # run DB & Updating chart
```

## Dev:

- Make sure you have Node.JS v14.X.X (tested on 14.17.1)
- Run `npm i` command
- `cp .env.example .env`
- Run `npm run typeorm:cli migration:run` command
- Run `npm run update`
