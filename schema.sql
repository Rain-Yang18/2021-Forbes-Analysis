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
	age INTEGER,
	residence TEXT,
	citizenship TEXT,
	status TEXT,
	children INTEGER,
	education TEXT,
	self_made TEXT,
	degree TEXT,
	university TEXT,
	longitude NUMERIC,
	latitude NUMERIC,
	groupednetworth TEXT,
	fullname TEXT
);

SELECT * FROM forbes_billionaires;