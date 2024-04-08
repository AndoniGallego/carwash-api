import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Entity( { name: 'washeds' } )
export class Wash {

    @PrimaryGeneratedColumn()
    id: any;

    @DeleteDateColumn()
    deletedAt: any;

    @Column()
    deleted: any;

    @Column()
    user: User;
}
