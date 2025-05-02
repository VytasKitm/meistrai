import { pool } from "../database/database.js";

//-------------------------------------------------------------------------------------------
// pagrindiniu lenteliu sukurimas:
//-------------------------------------------------------------------------------------------

async function meistraiTableCreate() {
      const query = `CREATE TABLE IF NOT EXISTS meistrai (
                        id                SERIAL PRIMARY KEY,
                        vardas            TEXT NOT NULL,
                        pavarde           TEXT NOT NULL,
                        servisai_id       INT NOT NULL
                  );`
      try {
            await pool.query(query)
            console.log('\x1b[33m meistrai\x1b[0m \x1b[32m Table created.\x1b[0m')
      }
      catch(error) {
            console.log("\x1b[31m meistrai table ceation failed.\x1b[0m", error)
      }          
      await pool.query(query)
}

async function servisaiTableCreate() {
      const query = `CREATE TABLE IF NOT EXISTS servisai (
                        id                SERIAL PRIMARY KEY,
                        pavadinimas       TEXT NOT NULL,
                        miestai_id        INT NOT NULL
                  );`
      try {
            await pool.query(query)
            console.log('\x1b[33m servisai\x1b[0m \x1b[32m Table created.\x1b[0m')
      }
      catch(error) {
            console.log("\x1b[31m servisai table ceation failed.\x1b[0m", error)
      }
}

async function miestaiTableCreate() {
      const query = `CREATE TABLE IF NOT EXISTS miestai (
                        id                SERIAL PRIMARY KEY,
                        pavadinimas       TEXT NOT NULL
                  );`
      try {
            await pool.query(query)
            console.log('\x1b[33m miestai\x1b[0m \x1b[32m Table created.\x1b[0m')
      }
      catch(error) {
            console.log("\x1b[31m miestai table ceation failed.\x1b[0m", error)
      }
}

async function vartotojaiTableCreate() {
      const query = `CREATE TABLE IF NOT EXISTS vartotojai (
                        id                SERIAL PRIMARY KEY,
                        vardas            TEXT NOT NULL,
                        email             VARCHAR (50) NOT NULL UNIQUE,
                        role              TEXT NOT NULL,
                        password          TEXT NOT NULL
                  );`
      try {
            await pool.query(query)
            console.log('\x1b[33m vartotojai\x1b[0m \x1b[32m Table created.\x1b[0m')
      }
      catch(error) {
            console.log("\x1b[31m vartotojai table ceation failed.\x1b[0m", error)
      }
}

async function ivertinimaiTableCreate() {
      const query = `CREATE TABLE IF NOT EXISTS ivertinimai (
                        PRIMARY KEY (vartotojai_id, meistrai_id),
                        vartotojai_id           INT NOT NULL,
                        meistrai_id             INT NOT NULL

                  );`
      try {
            await pool.query(query)
            console.log('\x1b[33m ivertinimai\x1b[0m \x1b[32m Table created.\x1b[0m')
      }
      catch(error) {
            console.log("\x1b[31m ivertinimai table ceation failed.\x1b[0m", error)
      }
}
//-------------------------------------------------------------------------------------------
// rysiu pridejimas lentelese
//-------------------------------------------------------------------------------------------

async function meistraiTableConstraints() {
      const query = `ALTER TABLE IF EXISTS meistrai
                        DROP CONSTRAINT IF EXISTS FK_meistrai_servisai,
                        ADD CONSTRAINT FK_meistrai_servisai
                              FOREIGN KEY (servisai_id) REFERENCES servisai(id)`

      try {
            await pool.query(query)
            console.log('\x1b[33m meistrai -> servisai\x1b[0m \x1b[32m relation created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[33m meistrai -> servisai\x1b[0m \x1b[31m relation failed.\x1b[0m')
      }
}

async function servisaiTableConstraints() {
      const query = `ALTER TABLE IF EXISTS servisai
                        DROP CONSTRAINT IF EXISTS FK_servisai_miestai,
                        ADD CONSTRAINT FK_servisai_miestai
                              FOREIGN KEY (miestai_id) REFERENCES miestai(id)`

      try {
            await pool.query(query)
            console.log('\x1b[33m servisai -> miestai\x1b[0m \x1b[32m relation created.\x1b[0m')
      }
      catch(error) {
            console.log('\x1b[33m servisai -> miestai\x1b[0m \x1b[31m relation failed.\x1b[0m')
      }
}

async function ivertinimaiTableConstraints() {
      const query = `ALTER TABLE IF EXISTS ivertinimai
                        DROP CONSTRAINT IF EXISTS FK_reitingai_vartotojai,
                        ADD CONSTRAINT FK_reitingai_vartotojai
                              FOREIGN KEY (vartotojai_id) REFERENCES vartotojai(id),
                        DROP CONSTRAINT IF EXISTS FK_reitingai_meistrai,
                        ADD CONSTRAINT FK_reitingai_meistrai
                              FOREIGN KEY (meistrai_id) REFERENCES meistrai(id)`
                        
      try {
            await pool.query(query)
            console.log('\x1b[33m ivertinimai -> vartotojai, meistrai\x1b[0m \x1b[32m relation created.\x1b[0m')
      }
      catch(error) {
            console.log('\x1b[33m ivertinimai -> vartotojai, meistrai\x1b[0m \x1b[31m relation failed.\x1b[0m', error)
      }
}

//-------------------------------------------------------------------------------------------
// visu lenteliu istrynimas
//-------------------------------------------------------------------------------------------


async function deleteAllTables() {
      const query = 'DROP TABLE IF EXISTS meistrai, servisai, miestai, ivertinimai, vartotojai'
      try {
            await pool.query(query)
            console.log('\x1b[33m meistrai, servisai, miestai, ivertinimai, vartotojai\x1b[0m \x1b[32m Tables deleted.\x1b[0m')
      }
      catch(error) {
            console.log("\x1b[31m Deleting all tables failed\x1b[0m", error)
      }
}

export {    meistraiTableCreate,
            servisaiTableCreate,
            miestaiTableCreate, 
            vartotojaiTableCreate, 
            ivertinimaiTableCreate,
            meistraiTableConstraints,
            servisaiTableConstraints,
            ivertinimaiTableConstraints,
            deleteAllTables
      }