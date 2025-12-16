import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private repo: Repository<Task>,
  ) {}

  create(data: CreateTaskDTO) {
    const task = this.repo.create(data);

    return this.repo.save(task);
  }

  findAll() {
    return this.repo.find({
      where: { is_delete: false },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    const task = await this.repo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: number, data: UpdateTaskDTO) {
    const task = await this.findOne(id);
    Object.assign(task, data);
    return this.repo.save(task);
  }
}
