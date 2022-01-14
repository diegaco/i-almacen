import Papa from 'papaparse';

import { INFORMATION } from '../app/constants';

import { Product } from './types';

export default {
  list: async (): Promise<Product[]> => {
    return fetch(INFORMATION.sheet)
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
