import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProjetoDto } from './create-projeto.dto';

export class UpdateProjetoDto extends PartialType(
    OmitType(CreateProjetoDto, ['tarefas'] as const)
) { }
