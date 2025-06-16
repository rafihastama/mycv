/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Expose, Transform } from 'class-transformer'

export class ReportDto {
  @Expose()
  id: number
  @Expose()
  price: number
  @Expose()
  year: number
  @Expose()
  lng: number
  @Expose()
  lat: number
  @Expose()
  make: string
  @Expose()
  model: string
  @Expose()
  mileage: number
  @Expose()
  approved: boolean

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number
}
