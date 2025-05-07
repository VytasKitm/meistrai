
import {
      mechanicsTableCreate,
      servicesTableCreate,
      citiesTableCreate,
      usersTableCreate,
      ratingsTableCreate,
      mechanicsTableConstraints,
      servicesTableConstraints,
      ratingsTableConstraints,
      specializationTableCreate,
      deleteAllTables
} from '../models/tablesModels.js'


async function createTables() {
      try {
            await deleteAllTables()
            await mechanicsTableCreate()
            await servicesTableCreate()
            await specializationTableCreate()
            await citiesTableCreate()
            await usersTableCreate()
            await ratingsTableCreate()
            await mechanicsTableConstraints()
            await servicesTableConstraints()
            await ratingsTableConstraints()
      }
      catch (error) {
            process.exit(1)
      }
}

export default createTables