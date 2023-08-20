import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChangelogsService } from './changelogs.service';
import { CreateChangelogDto } from './dto/create-changelog.dto';
import { UpdateChangelogDto } from './dto/update-changelog.dto';

@Controller('changelogs')
export class ChangelogsController {
  constructor(private readonly changelogsService: ChangelogsService) {}

  @Post()
  create(@Body() createChangelogDto: CreateChangelogDto) {
    return this.changelogsService.create(createChangelogDto);
  }

  @Get()
  findAll() {
    return this.changelogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.changelogsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChangelogDto: UpdateChangelogDto) {
    return this.changelogsService.update(id, updateChangelogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.changelogsService.delete(id);
  }
}
