export interface IBooking {
  id?: bigint
  user_id: bigint
  accomodation_id: bigint
  total_price: number
  initial_date: Date
  final_date: Date
  checked_in?: boolean
  checked_out?: boolean
  canceled?: boolean
}

export class Booking {}
