import {
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  
import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common';
import { AudioService } from './audio.service';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';

function generateFilename(_, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
  
@Controller('audios')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post()
  create(@Body() createAudioDto: CreateAudioDto) {
    return this.audioService.create(createAudioDto);
  }

  @Get()
  findAll() {
    return this.audioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audioService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAudioDto: UpdateAudioDto) {
    return this.audioService.update(id, updateAudioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audioService.remove(id);
  }
  
  @Patch(':id/favorite')
markAsFavorite(@Param('id') id: string) {
  return this.audioService.markAsFavorite(id);
}

@Patch(':id/unfavorite')
unmarkAsFavorite(@Param('id') id: string) {
  return this.audioService.unmarkAsFavorite(id);
}

@Get('/favorites')
findFavorites() {
  return this.audioService.findFavorites();
}

@Post('upload')
@UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: generateFilename,
    }),
  }),
)
uploadFile(@UploadedFile() file: Express.Multer.File) {
  return {
    message: 'Archivo subido exitosamente',
    filePath: file.path,
  };
}
}
