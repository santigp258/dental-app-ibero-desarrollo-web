import { ApiRequest } from '@/types/api'
import { error, success } from '@/api/lib/responses'
import HttpStatusCode from '@/api/lib/http-status-codes'
import prisma from '@/api/lib/prisma'
import {
  PatientFormSchemaCreateType,
  PatientFormSchemaType,
  UserFormSchemaType,
} from '@/constants/yup-schemas/prisma.schema'
import { getProfilePayloadFromBody } from '@/api/controllers/users/get-users.controller'
import _ from 'lodash'

export const getPatientsController = async (req: ApiRequest) => {
  const patients = await prisma.patient.findMany({ include: { profile: true } })

  return success(patients, HttpStatusCode.OK)
}

export const createPatientController = async (
  req: ApiRequest<PatientFormSchemaCreateType>,
) => {
  const body = req.validated

  const profile = await prisma.profile.findFirst({
    where: {
      email: body.email,
    },
  })

  if (profile) {
    return error(HttpStatusCode.UNPROCESSABLE_ENTITY, {
      email: {
        message: 'Email en uso',
      },
    })
  }

  const createdUser = await prisma.patient.create({
    data: {
      profile: {
        create: {
          ...(getProfilePayloadFromBody(body) as any),
        },
      },
    },
  })

  return success(createdUser, HttpStatusCode.OK)
}

export const updatePatientController = async (
  req: ApiRequest<PatientFormSchemaType>,
  props: { params: { id: string } },
) => {
  const patient = await prisma.patient.findUnique({
    where: {
      id: Number(props.params.id),
    },
  })

  if (!patient) {
    return error(HttpStatusCode.NOT_FOUND)
  }

  const body = _.omit(req.validated, ['email'])

  const updatePatient = await prisma.patient.update({
    where: {
      id: Number(props.params.id),
    },
    data: {
      profile: {
        update: getProfilePayloadFromBody(body as UserFormSchemaType),
      },
    },
  })

  return success(updatePatient, HttpStatusCode.OK)
}

export const getPatientController = async (
  req: ApiRequest,
  props: { params: { id: string } },
) => {
  const patient = await prisma.patient.findUnique({
    where: {
      id: Number(props.params.id),
    },
    include: {
      profile: {
        include: {
          municipality: true,
        },
      },
    },
  })

  if (!patient) {
    return error(HttpStatusCode.NOT_FOUND)
  }

  return success(
    {
      ...patient,
      profile: {
        ...patient.profile,
        departmentId: (patient.profile as any)?.municipality?.departmentId,
      },
    },
    HttpStatusCode.OK,
  )
}

export default getPatientsController
