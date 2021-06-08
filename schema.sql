-- Drop tables if exists
DROP TABLE IF EXISTS forbes_billionaires;

-- Create One table
CREATE TABLE forbes_billionaires (
	id INTEGER PRIMARY KEY,
	name TEXT,
	networth DECIMAL,
	country TEXT,
	source TEXT,
	rank INT,
	age INT,
	residence TEXT,
	citizenship TEXT,
	status TEXT,
	children INT,
	education TEXT,
	self_made TEXT,
	degree TEXT,
	university TEXT,
	longitude DECIMAL,
	latitude DECIMAL,
	groupednetworth TEXT,
	fullname TEXT
);

SELECT * FROM forbes_billionaires;