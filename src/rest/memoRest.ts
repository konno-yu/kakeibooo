// import axios from 'axios';

// const BASE_URL = 'http://localhost:3000/memo';

// export type GetResponse = {
//   fromDate: Date;
//   toDate: Date;
//   memoText: string;
// };

// export type PostRequest = {
//   fromDate: Date;
//   toDate: Date;
//   memoText: string;
// };

// export async function get() {
//   return axios.get<{}, GetResponse>(BASE_URL);
// }

// export async function getByYear(year: number) {
//   return axios.get<GetResponse[]>(`${BASE_URL}/${year}`);
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
//   return axios.post<PostRequest, GetResponse>(BASE_URL, body);
// }

// export async function update(body: PostRequest) {
//   return axios.put<PostRequest, GetResponse>(BASE_URL, body);
// }

// export async function deleteMemo(body: Date) {
//   const queryStr = body.toLocaleDateString().replace(/\//g, '_');
//   return axios.delete<{}, Response>(`${BASE_URL}/${queryStr}`);
// }
