import { rest } from 'msw';

export const expensesHandler = [
  rest.get('/rest/v1/expenses', (req, res, ctx) => res(ctx.status(200), ctx.json(mockedResponse))),
];

// TODO 型ちゃんとする
const mockedResponse = [
  {
    id: 1,
    purchase_date: '2022-04-01',
    receipts: [{ cost: 1000, index: 0, storeName: 'サンプル' }],
  },
];
