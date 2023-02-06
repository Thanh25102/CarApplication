import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDTO } from 'src/dto/create-report.dto';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
  create(CreateReportDTO: CreateReportDTO) {
    const report = this.repo.create(CreateReportDTO);
    return this.repo.save(report);
  }
}
