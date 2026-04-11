import { Profile } from 'src/profiles/entity/profile.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('feeds')
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'int', default: 0 })
  views: number;

  @ManyToOne(() => Profile, (profile) => profile.feeds, { cascade: ['insert'] })
  profile: Profile;
}
