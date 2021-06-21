require('dotenv').config();
import "reflect-metadata";
import { createConnection } from "typeorm";
import OrmConfig from "./ormconfig";
import { Candlestick } from "./entity/Candlestick";
import supportedTickers from "./services/supported-tickers";
import { allRanges, getChart } from "./services/rapidapi";
import config from "./services/config";
import * as pMap from 'p-map';


createConnection(OrmConfig).then(async connection => {
    const repo = connection.getRepository(Candlestick);

    for (const range of allRanges) {
        await pMap(supportedTickers, async (ticker) => {
            const chartResult = await getChart(ticker, range, config.rapidapiKey)

            const data = chartResult.indicators.quote[0];
            const candlestickCount = data.open.length;
            const candlesticks: Partial<Candlestick>[] = [];

            for (let j = 0; j < candlestickCount; j++) {
                candlesticks.push({
                    open: data.open[j].toString(),
                    close: data.close[j].toString(),
                    high: data.high[j].toString(),
                    low: data.low[j].toString(),
                    volume: data.volume[j].toString(),
                    moment: new Date(chartResult.timestamp[j] * 1000)
                })
            }

            await repo.save(candlesticks);
            console.log(`${chartResult.meta.symbol}: ${candlestickCount} candlesticks saved`);
        }, { concurrency: 4 });
    }
});
