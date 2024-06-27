import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault('America/Sao_Paulo')

dayjs.locale('pt-br')

export default dayjs
