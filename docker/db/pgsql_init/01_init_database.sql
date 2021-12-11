DROP TABLE IF EXISTS receipts;

-- レシート単位の食費
CREATE TABLE receipts (
    purchase_date DATE PRIMARY KEY NOT NULL,
    daily_cost JSONB[]
);

DROP TABLE IF EXISTS memo;

-- HOME画面の週ごとメモ
CREATE TABLE memo (
    from_date DATE PRIMARY KEY NOT NULL,
    to_date DATE NOT NULL,
    memo_text TEXT
);