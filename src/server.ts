import app from "./app"
import config from "./config/env"
import { prisma } from "./lib/prisma"


const port = config.port || 3000

const main = async () => {
  try{
    app.listen(port, () => {
      console.log(`server is running on port ${port}`)
    })
    await prisma.$connect()
    console.log('database connect successfully!')
  }catch(err){
    await prisma.$disconnect()
    console.log(err);
    process.exit(1)
  }
}


main()