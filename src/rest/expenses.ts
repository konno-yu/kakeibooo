import { getMonth, getYear } from 'date-fns';
import { Receipt } from '../reducer/householdBookSlice';
import { supabase } from '../supabaseClient';

export interface Get {
  id: number;
  purchased_at: string;
  receipts: Receipt[];
  created_at: Date;
}

export interface Post {
  purchased_at: Date;
  receipts: Receipt[];
}

/**
 * 指定した日が含まれる月の食費データを取得する
 * @param targetDate 編集対象日
 * @returns 1ヶ月分の食費データを返す
 */
export const get = async (targetDate: Date) => {
  const fromDate = new Date(getYear(targetDate), getMonth(targetDate), 1, 9, 0, 0);
  const toDate = new Date(getYear(targetDate), getMonth(targetDate) + 1, 1, 9, 0, 0);
  const response = await supabase
    .from<Get>('expenses')
    .select('*')
    .gte('purchased_at', fromDate.toISOString())
    .lt('purchased_at', toDate.toISOString());
  return response;
};

/**
 * 食費を登録する
 * @param targetDate 対象日
 * @param receipts 対象日のレシート
 * @returns 登録したデータを返す
 */
export const post = async (targetDate: Date, receipts: Receipt[]) => {
  const response = await supabase
    .from<Post>('expenses')
    .insert({ purchased_at: targetDate, receipts }, { returning: 'representation' });
  return response;
};

/**
 * 登録済みの食費を更新する
 * @param targetDate 対象日
 * @param receipts 対象日のレシート
 * @returns 更新後のデータを返す
 */
export const put = async (targetDate: Date, receipts: Receipt[]) => {
  const response = await supabase
    .from<Post>('expenses')
    .update({ receipts }, { returning: 'representation' })
    .match({ purchased_at: targetDate.toUTCString() });
  return response;
};
