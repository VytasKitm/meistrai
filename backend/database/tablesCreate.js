import {
      meistraiTableCreate,
      servisaiTableCreate,
      miestaiTableCreate,
      vartotojaiTableCreate,
      ivertinimaiTableCreate,
      meistraiTableConstraints,
      servisaiTableConstraints,
      ivertinimaiTableConstraints,
      deleteAllTables
} from '../models/tablesModels.js'

async function createTables() {
      try {
            await deleteAllTables()
            await meistraiTableCreate()
            await servisaiTableCreate()
            await miestaiTableCreate()
            await vartotojaiTableCreate()
            await ivertinimaiTableCreate()
            await meistraiTableConstraints()
            await servisaiTableConstraints()
            await ivertinimaiTableConstraints()
      }
      catch (error) {
            process.exit(1)
      }
}

export default createTables