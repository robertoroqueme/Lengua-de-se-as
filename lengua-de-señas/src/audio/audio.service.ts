import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Audio, AudioDocument } from './audio.schema';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';

@Injectable()
export class AudioService {
  constructor(@InjectModel(Audio.name) private audioModel: Model<AudioDocument>) {}

  async create(createAudioDto: CreateAudioDto): Promise<Audio> {
    const createdAudio = new this.audioModel(createAudioDto);
    return createdAudio.save();
  }

  async findAll(): Promise<Audio[]> {
    return this.audioModel.find().exec();
  }

  async findOne(id: string): Promise<Audio> {
    const audio = await this.audioModel.findById(id).exec();
    if (!audio) throw new NotFoundException(`Audio con id ${id} no encontrado`);
    return audio;
  }

  async update(id: string, updateAudioDto: UpdateAudioDto): Promise<Audio> {
    const updatedAudio = await this.audioModel.findByIdAndUpdate(id, updateAudioDto, {
      new: true,
    });
    if (!updatedAudio) throw new NotFoundException(`Audio con id ${id} no encontrado`);
    return updatedAudio;
  }

  async remove(id: string): Promise<void> {
    const result = await this.audioModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Audio con id ${id} no encontrado`);
    
}
async markAsFavorite(id: string): Promise<Audio> {
    const audio = await this.audioModel.findByIdAndUpdate(
      id,
      { isFavorite: true },
      { new: true },
    );
    if (!audio) throw new NotFoundException(`Audio con id ${id} no encontrado`);
    return audio;
  }
  
  async unmarkAsFavorite(id: string): Promise<Audio> {
    const audio = await this.audioModel.findByIdAndUpdate(
      id,
      { isFavorite: false },
      { new: true },
    );
    if (!audio) throw new NotFoundException(`Audio con id ${id} no encontrado`);
    return audio;
  }
  
  async findFavorites(): Promise<Audio[]> {
    return this.audioModel.find({ isFavorite: true }).exec();
  }
  
}
