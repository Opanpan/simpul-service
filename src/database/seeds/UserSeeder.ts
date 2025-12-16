import { DataSource } from 'typeorm';
import { User } from '../../chat/entities/user.entity';

export class UserSeeder {
  public static async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(User);

    const users = [
      {
        name: 'John Doe',
      },
      {
        name: 'Jane Smith',
      },
      {
        name: 'Bob Johnson',
      },
      {
        name: 'Alice Williams',
      },
      {
        name: 'Charlie Brown',
      },
    ];

    for (const userData of users) {
      const existingUser = await repository.findOne({
        where: { name: userData.name },
      });

      if (!existingUser) {
        const user = repository.create(userData);
        await repository.save(user);
      } else {
        console.log(`User already exists: ${userData.name}`);
      }
    }
  }
}
