import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private service: TasksService) {}

  @Post()
  create(@Body() data: CreateTaskDTO) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTaskDTO) {
    return this.service.update(+id, data);
  }
}
