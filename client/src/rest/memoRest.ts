import axios from 'axios';

const BASE_URL = 'http://localhost:3000/memo';

export type GetResponse =  {
    fromDate: Date;
    toDate: Date;
    memoText: string;
};

export type PostRequest = {
    fromDate: Date;
    toDate: Date;
    memoText: string;
};

export async function get() {
    return axios.get<{}, GetResponse>(BASE_URL);
}

export async function getByDuration(from: Date, to: Date) {
    return axios.get <GetResponse[]>(BASE_URL + '/duration', {
        params: {
            from: from.toLocaleDateString(),
            to: to.toLocaleDateString()
        }
    })
}

export async function post(body: PostRequest) {
    return axios.post<PostRequest, {}>(BASE_URL, body);
}