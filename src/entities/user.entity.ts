import { Column, Entity, OneToMany } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { CommonBigPKEntity } from './common.entity';

@Entity('User') //테이블 이름 ''로 설정 (설정안하면 클래스 이름이 테이블 명 됨)
export class UserEntity extends CommonBigPKEntity {
    @Column('varchar', { unique: true, nullable: false })
    email: string;

    @Column('varchar', { unique: false, nullable: false })
    password: string;

    @OneToMany(() => ArticleEntity, (article) => article.user)
    articles: ArticleEntity[]; //1:N관계이기 때문에 Article을 배열형식으로 씀

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];
}
