BEGIN;

-- 1) cities (Cities)
INSERT INTO cities (name) VALUES
  ('Vilnius'),
  ('Kaunas'),
  ('Klaipėda'),
  ('Šiauliai'),
  ('Panevėžys'),
  ('Alytus'),
  ('Marijampolė'),
  ('Mažeikiai'),
  ('Jonava'),
  ('Utena');

-- 2) services (Services)
INSERT INTO services (name, city_id) VALUES
  ('Automobilių remontas',      (SELECT id FROM cities WHERE name='Vilnius')),
  ('Padangų keitimas',          (SELECT id FROM cities WHERE name='Kaunas')),
  ('Tepalo keitimas',           (SELECT id FROM cities WHERE name='Vilnius')),
  ('Stabdžių remontas',         (SELECT id FROM cities WHERE name='Klaipėda')),
  ('Elektronikos remontas',     (SELECT id FROM cities WHERE name='Šiauliai')),
  ('Kėbulo darbai',             (SELECT id FROM cities WHERE name='Panevėžys')),
  ('Variklio diagnostika',      (SELECT id FROM cities WHERE name='Alytus')),
  ('Dujų įrangos montavimas',   (SELECT id FROM cities WHERE name='Marijampolė'));

  INSERT INTO specializations (name) VALUES
  ('Variklio remontas'),
  ('Padangų technika'),
  ('Tepalo keitimas'),
  ('Stabdžių remontas'),
  ('Elektronikos remontas'),
  ('Kėbulo darbai'),
  ('Diagnostika'),
  ('Dujų įrangos montavimas');

-- 3) mechanics (Mechanics)
INSERT INTO mechanics (name, last_name, service_id, specialization_id) VALUES
  ('Jonas',    'Kazlauskas',    (SELECT id FROM services WHERE name='Automobilių remontas'), 1),
  ('Rasa',     'Petrauskaitė',  (SELECT id FROM services WHERE name='Automobilių remontas'), 3),
  ('Mantas',   'Jankauskas',    (SELECT id FROM services WHERE name='Padangų keitimas'), 2),
  ('Aistė',    'Černiauskaitė', (SELECT id FROM services WHERE name='Tepalo keitimas'), 5),
  ('Lukas',    'Šimkus',        (SELECT id FROM services WHERE name='Padangų keitimas'), 4),
  ('Eglė',     'Žilinskaitė',   (SELECT id FROM services WHERE name='Stabdžių remontas'), 6),
  ('Darius',   'Andrius',       (SELECT id FROM services WHERE name='Elektronikos remontas'), 7),
  ('Greta',    'Milučkaitė',    (SELECT id FROM services WHERE name='Stabdžių remontas'), 4),
  ('Tomas',    'Paulius',       (SELECT id FROM services WHERE name='Kėbulo darbai'), 3),
  ('Karolis',  'Morkūnas',      (SELECT id FROM services WHERE name='Variklio diagnostika'), 4),
  ('Aušra',    'Razmienė',      (SELECT id FROM services WHERE name='Elektronikos remontas'), 1),
  ('Mindaugas','Karevičius',    (SELECT id FROM services WHERE name='Padangų keitimas'), 5),
  ('Agnė',     'Klišytė',       (SELECT id FROM services WHERE name='Kėbulo darbai'), 8),
  ('Ugnius',   'Balčiūnas',     (SELECT id FROM services WHERE name='Tepalo keitimas'), 2),
  ('Simona',   'Jančytė',       (SELECT id FROM services WHERE name='Variklio diagnostika'), 3),
  ('Andrius',  'Selevičius',    (SELECT id FROM services WHERE name='Elektronikos remontas'), 7),
  ('Ieva',     'Mažylė',        (SELECT id FROM services WHERE name='Stabdžių remontas'), 6),
  ('Žilvinas', 'Vernickas',     (SELECT id FROM services WHERE name='Automobilių remontas'), 5),
  ('Dovilė',   'Zalatoriūtė',   2, 3),  -- neturi priskirtos paslaugos
  ('Justinas', 'Biržiškis',     5, 2);  -- neturi priskirtos paslaugos

-- 4) Users
INSERT INTO users (email, name, password_h, role) VALUES
  ('jonas@tinklapis.lt',      'jonas',   'pasw', 'user'),
  ('rasa@tinklapis.lt',       'rasa',    'pasw', 'user'),
  ('petras@tinklapis.lt',     'petras',  'pasw', 'user'),
  ('ona@tinklapis.lt',        'ona',     'pasw', 'user'),
  ('laura@tinklapis.lt',      'laura',   'pasw', 'user'),
  ('mantas@tinklapis.lt',     'mantas',  'pasw', 'user'),
  ('darius@tinklapis.lt',     'darius',  'pasw', 'user'),
  ('egle@tinklapis.lt',       'egle',    'pasw', 'user'),
  ('greta@tinklapis.lt',      'greta',   'pasw', 'user'),
  ('simona@tinklapis.lt',     'simona',  'pasw', 'user'),
  ('admin@tinklapis.lt',      'admin',   'admin', 'admin');

-- 5) ratings (Ratings) — cover all variants
INSERT INTO ratings (users_id, mechanics_id) VALUES
  -- Jonas (user1) įvertino 5 meistrus:
  ((SELECT id FROM users WHERE email='jonas@tinklapis.lt'),
   (SELECT id FROM mechanics WHERE name='Jonas'   AND last_name='Kazlauskas')),
  ((SELECT id FROM users WHERE email='jonas@tinklapis.lt'),
   (SELECT id FROM mechanics WHERE name='Rasa'    AND last_name='Petrauskaitė')),
  ((SELECT id FROM users WHERE email='jonas@tinklapis.lt'),
   (SELECT id FROM mechanics WHERE name='Mantas'  AND last_name='Jankauskas')),
  ((SELECT id FROM users WHERE email='jonas@tinklapis.lt'),
   (SELECT id FROM mechanics WHERE name='Tomas'   AND last_name='Paulius')),
  ((SELECT id FROM users WHERE email='jonas@tinklapis.lt'),
   (SELECT id FROM mechanics WHERE name='Karolis' AND last_name='Morkūnas')),

  -- Rasa (user2) įvertino 1 meistrą:
  ((SELECT id FROM users WHERE email='rasa@tinklapis.lt'),
   (SELECT id FROM mechanics WHERE name='Jonas'   AND last_name='Kazlauskas')),

  -- Petras (user3) įvertino 3 meistrus:
  ((SELECT id FROM users WHERE email='petras@tinklapis.lt'),
   (SELECT id FROM mechanics WHERE name='Lukas'   AND last_name='Šimkus')),
  ((SELECT id FROM users WHERE email='petras@tinklapis.lt'),
   (SELECT id FROM mechanics WHERE name='Eglė'    AND last_name='Žilinskaitė')),
  ((SELECT id FROM users WHERE email='petras@tinklapis.lt'),
   (SELECT id FROM mechanics WHERE name='Darius'  AND last_name='Andrius')),

  -- Ona (user4) įvertino 1 meistrą:
  ((SELECT id FROM users WHERE email='ona@tinklapis.lt'),
   (SELECT id FROM mechanics WHERE name='Greta'   AND last_name='Milučkaitė')),

  -- Mantas (user6) įvertino 2 meistrus:
  ((SELECT id FROM users WHERE email='mantas@tinklapis.lt'),
   (SELECT id FROM mechanics WHERE name='Agnė'    AND last_name='Klišytė')),
  ((SELECT id FROM users WHERE email='mantas@tinklapis.lt'),
   (SELECT id FROM mechanics WHERE name='Ugnius'  AND last_name='Balčiūnas'));


COMMIT;
