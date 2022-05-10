-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public.expenses
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created_at timestamp with time zone DEFAULT now(),
    purchase_date date NOT NULL,
    receipts jsonb[],
    CONSTRAINT receipts_pkey PRIMARY KEY (id),
    CONSTRAINT receipts_purchase_date_key UNIQUE (purchase_date)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.expenses
    OWNER to postgres;

GRANT ALL ON TABLE public.expenses TO anon;

GRANT ALL ON TABLE public.expenses TO authenticated;

GRANT ALL ON TABLE public.expenses TO postgres;

GRANT ALL ON TABLE public.expenses TO service_role;
