import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BranchService {

  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>
  ) { }

  throwConflictException(message?: string): never {
    throw new ConflictException(message ? message : 'Filial já cadastrada')
  }

  throwNotFoundException(message?: string): never {
    throw new NotFoundException(message ? message : 'Filial não encontrada')
  }

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const { name } = createBranchDto;

    const existingBranch = await this.branchRepository.findOneBy({ name });

    if (existingBranch) {
      this.throwConflictException('Este nome de filial já existe');
    }

    const branch = this.branchRepository.create({ name });

    return this.branchRepository.save(branch);
  }

  async findAll(): Promise<Branch[]> {
    return await this.branchRepository.find()
  }

  async findOne(id: number): Promise<Branch> {
    const branch = await this.branchRepository.findOne({
      where: {
        id: id
      }
    })

    if (!branch) { this.throwNotFoundException() }

    return branch
  }

  async update(id: number, updateBranchDto: UpdateBranchDto): Promise<Branch> {

    const existingBranch = await this.branchRepository.findOneBy({ name: updateBranchDto.name })

    if (existingBranch) { this.throwConflictException("Este nome de filial já existe") }

    const updatedBranch = await this.branchRepository.preload({
      id: id,
      name: updateBranchDto.name
    })

    if (!updatedBranch) { this.throwNotFoundException() }

    return await this.branchRepository.save(updatedBranch)

  }

  async remove(id: number): Promise<Branch> {
    const existingBranch = await this.findOne(id)

    await this.branchRepository.remove(existingBranch)

    return existingBranch;
  }
}
