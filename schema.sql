-- Drop tables if exists
DROP TABLE IF EXISTS forbes_billionaires;

-- Create One table
CREATE TABLE forbes_billionaires (
	id INTEGER PRIMARY KEY,
	name TEXT,
	networth NUMERIC,
	country TEXT,
	source TEXT,
	rank INTEGER,
	age NUMERIC,
	citizenship TEXT,
	status TEXT,
	children NUMERIC,
	self_made TEXT,
	degree TEXT,
	university TEXT,
	longitude TEXT,
	latitude TEXT
);

SELECT * FROM forbes_billionaires;