import { pool } from "../database/database.js";

//-------------------------------------------------------------------------------------------
// pagrindiniu lenteliu sukurimas:
//-------------------------------------------------------------------------------------------

async function mechanicsTableCreate() {
      const query = `CREATE TABLE IF NOT EXISTS mechanics (
                        id                SERIAL PRIMARY KEY,
                        name              TEXT NOT NULL,
                        last_name         TEXT NOT NULL,
                        service_id        INT NOT NULL,
                        specialization_id INT NOT NULL
                  );`
      try {
            await pool.query(query)
            console.log('\x1b[33m mechanics\x1b[0m \x1b[32m Table created.\x1b[0m')
      }
      catch(error) {
            console.log("\x1b[31m mechanics table ceation failed.\x1b[0m", error)
      }          
      await pool.query(query)
}

async function servicesTableCreate() {
      const query = `CREATE TABLE IF NOT EXISTS services (
                        id                SERIAL PRIMARY KEY,
                        name              TEXT NOT NULL,
                        city_id           INT NOT NULL
                  );`
      try {
            await pool.query(query)
            console.log('\x1b[33m services\x1b[0m \x1b[32m Table created.\x1b[0m')
      }
      catch(error) {
            console.log("\x1b[31m services table ceation failed.\x1b[0m", error)
      }
}

async function citiesTableCreate() {
      const query = `CREATE TABLE IF NOT EXISTS cities (
                        id               SERIAL PRIMARY KEY,
                        name             TEXT NOT NULL UNIQUE
                  );`
      try {
            await pool.query(query)
            console.log('\x1b[33m city\x1b[0m \x1b[32m Table created.\x1b[0m')
      }
      catch(error) {
            console.log("\x1b[31m city table ceation failed.\x1b[0m", error)
      }
}

async function usersTableCreate() {
      const query = `CREATE TABLE IF NOT EXISTS users (
                        id                SERIAL PRIMARY KEY,
                        name              TEXT NOT NULL,
                        email             VARCHAR (50) NOT NULL UNIQUE,
                        role              TEXT NOT NULL,
                        password_h          TEXT NOT NULL
                  );`
      try {
            await pool.query(query)
            console.log('\x1b[33m users\x1b[0m \x1b[32m Table created.\x1b[0m')
      }
      catch(error) {
            console.log("\x1b[31m users table ceation failed.\x1b[0m", error)
      }
}

async function ratingsTableCreate() {
      const query = `CREATE TABLE IF NOT EXISTS ratings (
                        PRIMARY KEY (users_id, mechanics_id),
                        users_id          INT NOT NULL,
                        mechanics_id      INT NOT NULL,
                        rating            INT
                  );`
      try {
            await pool.query(query)
            console.log('\x1b[33m ratings\x1b[0m \x1b[32m Table created.\x1b[0m')
      }
      catch(error) {
            console.log("\x1b[31m ratings table ceation failed.\x1b[0m", error)
      }
}

async function specializationTableCreate() {
      const query = `CREATE TABLE IF NOT EXISTS specializations (
                        id                SERIAL PRIMARY KEY,
                        name              TEXT NOT NULL
                  );`
      try {
            await pool.query(query)
            console.log('\x1b[33m specializations\x1b[0m \x1b[32m Table created.\x1b[0m')
      }
      catch(error) {
            console.log("\x1b[31m specializations table ceation failed.\x1b[0m", error)
      }
}
//-------------------------------------------------------------------------------------------
// rysiu pridejimas lentelese
//-------------------------------------------------------------------------------------------

async function mechanicsTableConstraints() {
      const query = `ALTER TABLE IF EXISTS mechanics
                        DROP CONSTRAINT IF EXISTS FK_mechanics_services,
                        ADD CONSTRAINT FK_mechanics_services
                              FOREIGN KEY (service_id) REFERENCES services(id),
                        DROP CONSTRAINT IF EXISTS FK_mechanics_specializations,
                        ADD CONSTRAINT FK_mechanics_specializations
                              FOREIGN KEY (specialization_id) REFERENCES specializations(id)`

      try {
            await pool.query(query)
            console.log('\x1b[33m mechanics -> services\x1b[0m \x1b[32m relation created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[33m mechanics -> services\x1b[0m \x1b[31m relation failed.\x1b[0m', error)
      }
}

async function servicesTableConstraints() {
      const query = `ALTER TABLE IF EXISTS services
                        DROP CONSTRAINT IF EXISTS FK_services_cities,
                        ADD CONSTRAINT FK_services_cities
                              FOREIGN KEY (city_id) REFERENCES cities(id)`

      try {
            await pool.query(query)
            console.log('\x1b[33m services -> cities\x1b[0m \x1b[32m relation created.\x1b[0m')
      }
      catch(error) {
            console.log('\x1b[33m services -> cities\x1b[0m \x1b[31m relation failed.\x1b[0m', error)
      }
}


async function ratingsTableConstraints() {
      const query = `ALTER TABLE IF EXISTS ratings
                        DROP CONSTRAINT IF EXISTS FK_ratings_users,
                        ADD CONSTRAINT FK_ratings_users
                              FOREIGN KEY (users_id) REFERENCES users(id)
                              ON DELETE CASCADE,
                        DROP CONSTRAINT IF EXISTS FK_ratings_mechanics,
                        ADD CONSTRAINT FK_ratings_mechanics
                              FOREIGN KEY (mechanics_id) REFERENCES mechanics (id)
                              ON DELETE CASCADE`
                        
      try {
            await pool.query(query)
            console.log('\x1b[33m ratings -> users, mechanics\x1b[0m \x1b[32m relation created.\x1b[0m')
      }
      catch(error) {
            console.log('\x1b[33m ratings -> users, mechanics\x1b[0m \x1b[31m relation failed.\x1b[0m', error)
      }
}

//-------------------------------------------------------------------------------------------
// visu lenteliu istrynimas
//-------------------------------------------------------------------------------------------


async function deleteAllTables() {
      const query = 'DROP TABLE IF EXISTS mechanics, services, specializations, cities, ratings, users'
      try {
            await pool.query(query)
            console.log('\x1b[33m mechanics, services, specializations, cities, ratings, users\x1b[0m \x1b[32m Tables deleted.\x1b[0m')
      }
      catch(error) {
            console.log("\x1b[31m Deleting all tables failed\x1b[0m", error)
      }
}

export {    mechanicsTableCreate,
            servicesTableCreate,
            citiesTableCreate, 
            usersTableCreate, 
            ratingsTableCreate,
            mechanicsTableConstraints,
            servicesTableConstraints,
            ratingsTableConstraints,
            deleteAllTables,
            specializationTableCreate
      }