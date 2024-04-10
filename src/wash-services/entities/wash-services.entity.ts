import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity( { name: 'wash-services' } )
export class WashServices {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( { nullable: false } )
    title: any;

    @Column( { nullable: false } )
    description: any;

    @Column( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' } )
    createdAt: Date;

    @Column( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' } )
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: any;

    @Column( { default: false } )
    deleted: any;
}
