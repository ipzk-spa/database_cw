const { Injectable, NotFoundException } = require('@nestjs/common');
const { InjectRepository } = require('@nestjs/typeorm');
const { ILike, In } = require('typeorm');
const { Alcohol } = require('./entities/alcohol.entity');

@Injectable()
class AlcoholService {
  constructor(@InjectRepository(Alcohol) alcoholRepository) {
    this.alcoholRepository = alcoholRepository;
  }

  async create(createAlcoholDto) {
    const alcohol = this.alcoholRepository.create(createAlcoholDto);
    return await this.alcoholRepository.save(alcohol);
  }

  async findAll() {
    return await this.alcoholRepository.find({ relations: ['orderItems'] });
  }

  async findOne(id) {
    try {
      return await this.alcoholRepository.findOneOrFail({
        where: { id },
        relations: { orderItems: true },
      });
    } catch (error) {
      throw new NotFoundException(`Alcohol not found by id ${id}.`);
    }
  }

  async findAlcoholByFilter(filterAlcoholDto) {
    const where = {};

    Object.entries(filterAlcoholDto).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;

      if (key === 'brand') {
        where.brand = ILike(`%${value}%`);
        return;
      }

      if (Array.isArray(value)) {
        where[key] = In(value);
      } else {
        where[key] = value;
      }
    });

    try {
      return await this.alcoholRepository.find({
        where,
        order: { brand: 'ASC' },
      });
    } catch (error) {
      throw new NotFoundException('Alcohol not found.');
    }
  }

  async remove(id) {
    await this.findOne(id);
    return await this.alcoholRepository.delete(id);
  }
}

module.exports = { AlcoholService };
