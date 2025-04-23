import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommonBigPKEntity } from './common.entity';
import { UserEntity } from './user.entity';

@Entity('Article')
export class ArticleEntity extends CommonBigPKEntity {
    @Column('varchar', { unique: false, nullable: false})
    title: string;

    @Column('text', { unique: false, nullable: false})
    content: string;

    @Column('bigint', { unique: false, nullable: false})
    userId: string; //ManyToOne이 아니라 Column인 이유?

    @ManyToOne(() => UserEntity, (user) => user.articles) //articles : N:1
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' }) //외래키
    user: UserEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.article) //article : 1:N
    comments: CommentEntity[];
}