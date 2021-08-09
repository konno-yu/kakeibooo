DROP TABLE IF EXISTS receipts;

-- レシート単位の食費
CREATE TABLE receipts (
    purchase_date DATE PRIMARY KEY NOT NULL,
    daily_cost JSONB[]
);