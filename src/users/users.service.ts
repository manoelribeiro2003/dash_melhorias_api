import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    throwNotFoundError(): never {
        throw new NotFoundException('Usuário não encontrado');
    }

    async create(body: CreateUserDto): Promise<User> {

        const newUser = this.userRepository.create(body);

        return await this.userRepository.save(newUser)
    }

    async findAll(): Promise<User[]> {

        const users = await this.userRepository.find()

        return users
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                id: id
            }
        })

        if (user) return user;

        this.throwNotFoundError();
    }


    async update(id: number, updateUserDto: UpdateUserDto) {

        const user = await this.userRepository.preload({
            id: id,
            ...updateUserDto
        })

        if (!user) return this.throwNotFoundError();

        await this.userRepository.save(user);

        return user;


    }

    async remove(id: number) {
        const user = await this.userRepository.findOneBy({
            id
        })

        if (!user) return this.throwNotFoundError();

        await this.userRepository.remove(user)

        return user;
    }
}
