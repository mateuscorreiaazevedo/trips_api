import dayjs from '@core/shared/libs/dayjs'

export function validateLegalAge(birthDate: Date): boolean {
  const formatedBirthDate = birthDate.getTime()
  const today = new Date().getTime()

  const differenceLegalAge = dayjs(today).diff(dayjs(formatedBirthDate), 'year')

  return differenceLegalAge >= 18
}
