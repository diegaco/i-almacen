import Papa from 'papaparse';

import { Product } from './types';

export default {
  list: async (): Promise<Product[]> => {
    return fetch(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSpUH4tMNFq7BgnIHZGTBDAuzWl5el51Y1kGMw39MLzktwYHX_suKTGo1ZFCjLxm_lFezwB4xp76RTH/pub?output=csv',
    )
      .then((res) => res.text())
      .then((data) => {
        return new Promise<Product[]>((resolve, reject) => {
          Papa.parse(data, {
            header: true,
            complete: (results) => {
              const products = results.data as Product[];

              return resolve(products.map((product) => ({ ...product, price: +product.price })));
            },
            error: (err) => reject(err),
          });
        });
      });
  },
};
