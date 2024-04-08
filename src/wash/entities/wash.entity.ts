import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity( { name: 'washeds' } )
export class Wash {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( () => User, user => user.washeds, {nullable: false} )
    @JoinColumn( { name: 'id' } )
    user: User;

    @Column( { nullable: false } )
    patent: string;

    @Column( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' } )
    createdAt: Date;

    @Column( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' } )
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column( { default: false } )
    deleted: boolean;
}
