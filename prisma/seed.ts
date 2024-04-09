import { prisma } from "../src/lib/prisma";

async function seed(){
  await prisma.event.create({
    data:{
      id: '04987b70-a36e-4fb6-b53a-2cd4d75cb2a7',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'Um evento p/ devs apaixonados(as) por código!',
      maximumAttendees: 120
    }
  })
}

seed().then(() => {
  prisma.$disconnect()
})