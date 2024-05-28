import { Prisma, PrismaClient, Role } from '@prisma/client'
import { hashPassword } from '../src/api/lib/utils'
import { colombiaData } from './colombia-departments'
import { professions } from './professions'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Santiago Guerrero',
    email: 'test@test.com',
    password: hashPassword('password'),
    role: Role.admin,
    profile: {
      create: {
        image: 'https://github.com/santigp258.png',
      },
    },
  },
  {
    name: 'Santiago Guerrero',
    email: 'sguerr27@ibero.edu.co',
    password: hashPassword('password'),
    role: Role.admin,
    profile: {
      create: {
        image: 'https://github.com/santigp258.png',
      },
    },
  },
  {
    name: 'Mateo Solano',
    email: 'mateo@ibero.edu.co',
    password: hashPassword('password'),
    role: Role.admin,
    profile: {
      create: {
        image: 'https://github.com/MateoSolano65.png',
      },
    },
  },
  {
    name: 'Jose Miguel Peña',
    email: 'penahin@ibero.edu.co',
    password: hashPassword('password'),
    role: Role.user,
    profile: {
      create: {
        image: 'https://github.com/santigp258.png',
      },
    },
  },
]

async function main() {
  const data = Object.entries(colombiaData)

  for (const [department, municipalities] of data) {
    const mappedMunicipalities = municipalities.map((municipality) => ({
      name: municipality,
    }))

    await prisma.department.create({
      data: {
        name: department,
        municipalities: {
          createMany: { data: mappedMunicipalities },
        },
      },
    })

    console.log(`Created department: ${department} and its municipalities`)
  }

  for (const profession of professions) {
    await prisma.profession.create({
      data: {
        name: profession,
      },
    })

    console.log(`Created profession: ${profession}`)
  }

  for (const u of userData) {
    const user = await prisma.user.create({
      data: {
        ...u,
        profile: {
          create: {
            ...u.profile.create,
            name: u.name,
            email: u.email,
          },
        },
      },
    })

    console.log(`Created user with id: ${user.id}`)
  }

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
