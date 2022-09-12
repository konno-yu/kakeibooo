import { getDate, lastDayOfMonth } from 'date-fns';

export const initAchievements: {
  title: string;
  text: string;
  rank: 'gold' | 'silver' | 'bronze';
  isAchieve: boolean;
}[] = [
  { title: 'はじめの1歩', text: '1日分の食費を登録した', rank: 'bronze', isAchieve: false },
  { title: 'Kakeiboooビギナー', text: '5日分の食費を登録した', rank: 'bronze', isAchieve: false },
  { title: 'Kakeibooooプロ', text: '15日分の食費を登録した', rank: 'silver', isAchieve: false },
  { title: 'Kakeibooooマスター', text: '25日分の食費を登録した', rank: 'silver', isAchieve: false },
  { title: '料理上手', text: 'ノーマネーデイを1日作れた', rank: 'bronze', isAchieve: false },
  { title: '買い物上手', text: 'ノーマネーデイを3日作れた', rank: 'bronze', isAchieve: false },
  { title: '買い物の玄人', text: 'ノーマネーデイを5日作れた', rank: 'silver', isAchieve: false },
  { title: '買い物の達人', text: 'ノーマネーデイを7日作れた', rank: 'gold', isAchieve: false },
  { title: '節約上手', text: '食費が月の予算内に収まった', rank: 'gold', isAchieve: false },
  { title: '皆勤賞', text: '毎日忘れず食費を登録した', rank: 'gold', isAchieve: false },
  { title: '今月はツイてる！', text: '食費が777円だった', rank: 'gold', isAchieve: false },
];

export const getAchievements = (today: Date, expenses: Array<{ date: Date; total: number | null }>) => {
  const achievements = initAchievements;
  const registered = expenses.filter((e) => e.total !== null).length; // 0も含めたいので明示的に !== null を指定
  if (registered >= 1) achievements[0].isAchieve = true;
  if (registered >= 5) achievements[1].isAchieve = true;
  if (registered >= 15) achievements[2].isAchieve = true;
  if (registered >= 25) achievements[3].isAchieve = true;
  const noMoney = expenses.filter((e) => e.total === 0).length;
  if (noMoney >= 1) achievements[4].isAchieve = true;
  if (noMoney >= 3) achievements[5].isAchieve = true;
  if (noMoney >= 5) achievements[6].isAchieve = true;
  if (noMoney >= 7) achievements[7].isAchieve = true;

  const total = expenses.map((t) => t.total).reduce((a, c) => a + c, 0);
  if (lastDayOfMonth(today).getDate() === getDate(today) && total < 40000) {
    initAchievements[8].isAchieve = true;
  }
  if (lastDayOfMonth(today).getDate() === getDate(today) && expenses.filter((e) => e.total === null).length === 0) {
    initAchievements[9].isAchieve = true;
  }
  if (expenses.filter((e) => e.total === 777).length > 0) achievements[10].isAchieve = true;
  return achievements;
};
