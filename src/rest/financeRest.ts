// import axios from 'axios';

// const BASE_URL = 'http://localhost:3000/receipts';

// export type GetResponse = {
//   purchaseDate: Date;
//   dailyCost: { storeName: string; cost: number }[];
// };

// export type PostRequest = {
//   purchaseDate: Date;
//   dailyCost?: { storeName: string; cost: number }[];
// };

// export type PostResponse = Response & {
//   data: {
//     purchaseDate: Date;
//     dailyCost?: { storeName: string; cost: number }[];
//   };
// };

// export type PutResponse = Response & {
//   data: {
//     purchaseDate: Date;
//     dailyCost?: { storeName: string; cost: number }[];
//   };
// };

// export type PutRequest = PostRequest;

// export async function get() {
//   return axios.get<{}, GetResponse>(BASE_URL);
// }

// export async function getByMonth(year: number, month: number) {
//   return axios.get<GetResponse[]>(`${BASE_URL}/${year}/${month + 1}`);
// }

// export async function getByDuration(from: Date, to: Date) {
//   return axios.get<GetResponse[]>(`${BASE_URL}/duration`, {
//     params: {
//       from: from.toLocaleDateString(),
//       to: to.toLocaleDateString(),
//     },
//   });
// }

// export async function post(body: PostRequest) {
//   return axios.post<PostRequest, PostResponse>(BASE_URL, body);
// }

// export async function update(body: PutRequest) {
//   return axios.put<PutRequest, PutResponse>(BASE_URL, body);
// }
