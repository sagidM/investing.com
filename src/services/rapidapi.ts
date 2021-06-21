import * as https from "https";
import { Timestamp } from "../types";

interface Chart {
    message?: string;
    chart: {
        error?: unknown;
        result?: ChartResult[];
    }
}

interface ChartResult {
    indicators: {
        quote: [{
            open: number[];
            close: number[];
            high: number[];
            low: number[];
            volume: number[];
        }]
    },
    timestamp: Timestamp[],
    meta: {
        currency: string;
        symbol: string;
        exchangeName: 'NMS';
        instrumentType: 'EQUITY';
        firstTradeDate: Timestamp;
        regularMarketTime: Timestamp;
        gmtoffset: -14400;
        timezone: 'EDT';
        exchangeTimezoneName: 'America/New_York';
        regularMarketPrice: number;
        chartPreviousClose: number;
        previousClose: number;
        dataGranularity: string;
        range: string;
    }
}

export type Range = '1d' | '5d' | '3mo' | '6mo' | '1y' | '5y' | 'max';
export const allRanges = ['1d', '5d', '3mo', '6mo', '1y', '5y', 'max'] as Readonly<Range[]>;

export function getChart(ticker: string, range: Range, rapidapiKey: string) {
    return new Promise<ChartResult>((resolve, reject) => {
        const req = https.request({
            method: "GET",
            hostname: "apidojo-yahoo-finance-v1.p.rapidapi.com",
            path: `/market/get-charts?symbol=${ticker}&interval=5m&range=${range}&region=US`,
            headers: {
                "x-rapidapi-key": rapidapiKey,
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            }
        }, res => {
            const chunks: Buffer[] = []

            res.on("error", reject)
            res.on("data", (chunk) => chunks.push(chunk as Buffer))

            res.on("end", () => {
                const body = Buffer.concat(chunks)
                const result = JSON.parse(body.toString()) as Chart

                if (result.message) return reject(result.message)
                if (result.chart.error) return reject(result.chart.error)
                resolve(result.chart.result![0])
            });
        });

        req.end();
    })
}
