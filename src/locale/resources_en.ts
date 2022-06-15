/**
 * 言語リソースを画面ごとに定義
 * 複数の画面で使われるものに関しては適宜キーを変えて管理すること
 */
export const resourceEng = {
  common: {
    application_title: 'Kakeibooo',
    user_id: '@{{userName}}',
    log_out: 'log out',
    home: 'Home',
    calendar: 'Calendar',
    pass_book: 'Passbook',
    fridge: 'Fridge',
    settings: 'Settings',
    yen: '¥{{money}}',
    input_placeholder: 'Please input',
    format_year_month: '{{month}} {{year}}',
    format_year_month_day: '{{day}}/{{month}}/{{year}}',
  },
  login: {
    welcome_banner: 'Welcome Back!',
    mail_address: 'mail address',
    password: 'password',
    log_in: 'login',
    login_failure: 'Mail address or password is invalid.',
  },
  calendar: {
    today: 'Today',
    sunday: 'Sun',
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    store_name: 'Store name',
    using_expense: 'expense',
    registration_complete: 'Registration complete',
    registration_imcomplete: 'Registration imcomplete',
    expense_is_not_entered: 'Expense is not entered',
    store_name_is_not_entered: 'Store name is not entered',
    expense_is_not_number: 'Expense is not number',
    exists_duplicate_receipts: 'It exists duplicate receipts',
    add_receipts: 'Add receipts',
    summartion: 'total',
    register_expense: 'Register expense',
    register_for_no_money_day: 'Register for no money day',
  },
};
