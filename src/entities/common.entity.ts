//user,article,comment entity에 공통적으로 들어가는 칼럼
//상속을 통해 해당 칼럼을 다른 entity에 적용
import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn, //Auto Increment가 걸린 PK(기본키)를 만드는 칼럼
    UpdateDateColumn,
} from 'typeorm';

export class CommonBigPKEntity {
    @PrimaryGeneratedColumn({ type: 'bigint'})
    id: string;

    @CreateDateColumn({ type: 'timestamp'})
    createdAT: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updateAt: Date | null;

    @DeleteDateColumn({ type: 'timestamp', nullable: true}) ////Soft Delete를 위한 칼럼
    deletedAt: Date | null; 
}