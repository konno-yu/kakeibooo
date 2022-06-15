/**
 * 言語リソースを画面ごとに定義
 * 複数の画面で使われるものに関しては適宜キーを変えて管理すること
 */
export const resourceJap = {
  common: {
    application_title: 'Kakeibooo',
    user_id: '@{{userName}}',
    log_out: 'ログアウト',
    home: 'ホーム',
    calendar: 'カレンダー',
    pass_book: '通帳',
    fridge: '冷蔵庫',
    settings: '設定',
    yen: '¥{{money}}',
    input_placeholder: '文字を入力してください',
    format_year_month: '{{year}}年{{month}}月',
    format_year_month_day: '{{year}}/{{month}}/{{day}}',
  },
  login: {
    welcome_banner: 'Welcome Back!',
    mail_address: 'メールアドレス',
    password: 'パスワード',
    log_in: 'ログイン',
    login_failure: 'メールアドレスかパスワードが間違っています',
  },
  calendar: {
    today: '今日',
    sunday: '日',
    monday: '月',
    tuesday: '火',
    wednesday: '水',
    thursday: '木',
    friday: '金',
    saturday: '土',
    store_name: '店舗名',
    using_expense: '使った金額',
    registration_complete: '登録が完了しました',
    registration_imcomplete: '登録に失敗しました',
    expense_is_not_entered: '金額が未入力のレシートがあります',
    store_name_is_not_entered: '店舗名が未入力のレシートがあります',
    expense_is_not_number: '金額が数値ではないレシートがあります',
    exists_duplicate_receipts: '同じ店舗のレシートが複数あるようです',
    add_receipts: 'レシートを追加',
    summartion: '合計',
    register_expense: '食費を登録',
    register_for_no_money_day: 'Noマネーデイとして登録',
  },
};
