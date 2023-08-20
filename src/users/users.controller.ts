import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(id, body);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }
}
