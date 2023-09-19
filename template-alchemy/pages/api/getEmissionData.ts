import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { PocketBase } from 'pocketbase';

type SupportedTickers = 'eth' | 'btc' | 'matic' | 'eth2';

class CCRIApi {
  key: string;
  headers: Record<string, string>;
  baseUrl: string;
  db: PocketBase;

  constructor() {
    this.key = 'dSX0OWkLVpTondd5WZPjFEOt';
    this.headers = { Accept: 'application/json' };
    this.baseUrl = 'https://v2.api.carbon-ratings.com';
    this.db = new PocketBase('http://127.0.0.1:8090');
  }

  async getLatestDatabaseEntry(ticker: SupportedTickers) {
    // Fetch the latest data for this ticker from the database
    const query = `SELECT * FROM emissions_data WHERE ticker='${ticker}' ORDER BY timestamp DESC LIMIT 1`;
    const latestData = await this.db.execute(query);
    return latestData[0];
  }

  async getTickerEmissions(ticker: SupportedTickers) {
    const latestData = await this.getLatestDatabaseEntry(ticker);

    // Define the query based on the latest available data timestamp
    const url = `${this.baseUrl}/currencies/${ticker}/emissions/network?key=${this.key}`;

    const response = await axios.get(url, { headers: this.headers });

    if (response.status !== 200) {
      return response.statusText;
    }

    const data = response.data;

    // Assume each data entry has a timestamp
    for (const entry of data.entries) {
      // Compare with the latest data timestamp
      if (!latestData || new Date(entry.timestamp) > new Date(latestData.timestamp)) {
        // If it's new, add it to the database
        const insertQuery = `INSERT INTO emissions_data (...) VALUES (...)`;
        await this.db.execute(insertQuery, [/* values here */]);
      }
    }

    return data;
  }

  async refreshAllEmissionsCsv() {
    const tickers: SupportedTickers[] = ['eth', 'btc', 'eth2'];
    for (const ticker of tickers) {
      await this.getTickerEmissions(ticker);
    }
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = new Database('YOUR_POCKETBASE_CONNECTION_STRING');
  const ccri = new CCRIApi(db);

  if (req.method === 'GET') {
    await ccri.refreshAllEmissionsCsv();
    res.status(200).json({ message: 'Emission data refreshed' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
