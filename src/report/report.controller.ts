import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDTO } from 'src/dto/create-report.dto';
import { Guard } from 'src/guard/auth.guard';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseGuards(Guard)
  createReport(@Body() body: CreateReportDTO) {
    return this.reportService.create(body);
  }
}
