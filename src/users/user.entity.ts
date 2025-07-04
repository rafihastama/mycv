import { Report } from '../reports/report.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @Column({ default: true })
  admin: boolean

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[]

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id', this.id)
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id', this.id)
  }

  @AfterRemove()
  logDelete() {
    console.log('Deleted user with id', this.id)
  }
}
