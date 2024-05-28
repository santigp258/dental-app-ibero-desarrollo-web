import sha256 from 'crypto-js/sha256'
import * as Yup from 'yup'
import type {
  InternalFieldErrors,
  InternalFieldName,
  ValidateResult,
} from 'react-hook-form'

const appendErrors = (
  name: InternalFieldName,
  validateAllFieldCriteria: boolean,
  errors: InternalFieldErrors,
  type: string,
  message: ValidateResult,
) =>
  validateAllFieldCriteria
    ? {
        ...errors[name],
        /*   types: {
          ...(errors[name] && errors[name]!.types ? errors[name]!.types : {}),
          [type]: message || true,
        },*/
      }
    : {}

export const hashPassword = (password: string) => {
  return sha256(password).toString()
}

/* Avoid empty string */
export const parseBody = (body: any) => {
  if (!body) {
    return {}
  }

  try {
    const resp = JSON.parse(JSON.stringify(body))

    if (typeof resp === 'string') {
      return {}
    }
    return resp
  } catch (e) {
    return {}
  }
}

/*
 * Why `path!` ? because it could be `undefined` in some case
 * https://github.com/jquense/yup#validationerrorerrors-string--arraystring-value-any-path-string
 */
export const parseErrorSchema = (
  error: Yup.ValidationError,
  validateAllFieldCriteria: boolean,
) => {
  return (error.inner || []).reduce<Record<string, any>>((previous, error) => {
    if (!previous[error.path!]) {
      previous[error.path!] = { message: error.message, type: error.type! }
    }

    if (validateAllFieldCriteria) {
      const types = previous[error.path!].types
      const messages = types && types[error.type!]

      previous[error.path!] = appendErrors(
        error.path!,
        validateAllFieldCriteria,
        previous,
        error.type!,
        messages
          ? ([] as string[]).concat(messages as string[], error.message)
          : error.message,
      )
    }

    return previous
  }, {})
}
