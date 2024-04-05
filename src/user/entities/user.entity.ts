import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity( { name: 'users' } )
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column( { default: false } )
    deleted: boolean;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column( { nullable: false, unique: true } )
    phone: number;

    @Column( { nullable: false, unique: true } )
    patent: string;

    async hashPassword( password: string ) {
        return await bcrypt.hashSync( password, 10 );
    }

    async comparePassword (candidatePassword: string): Promise<boolean> {
        return await bcrypt.compare(candidatePassword, this.password);
     };
}
