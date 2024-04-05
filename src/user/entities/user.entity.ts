import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity( { name: 'users' } )
export class User {

    @PrimaryGeneratedColumn()
    id: any;

    @Column()
    name: any;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    deleted: any;

    @Column()
    password: any;

    @Column()
    role: string;

    @Column( { nullable: false, unique: true } )
    phone: any;

    @Column( { nullable: false, unique: true } )
    patent: string;

    async hashPassword( password: string ) {
        return await bcrypt.hashSync( password, 10 );
    }

    async comparePassword (candidatePassword: string): Promise<boolean> {
        return await bcrypt.compare(candidatePassword, this.password);
     };
}
