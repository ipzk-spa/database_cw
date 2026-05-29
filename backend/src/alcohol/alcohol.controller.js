const {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
  ParseFloatPipe,
  Inject,
} = require('@nestjs/common');
const { FileInterceptor } = require('@nestjs/platform-express');
const { diskStorage } = require('multer');
const { basename, extname } = require('path');
const { AlcoholService } = require('./alcohol.service');
const { CreateAlcoholDto } = require('./dto/create-alcohol.dto');
const { FilterAlcoholDto } = require('./dto/filter-alcohol.dto');

@Controller('alcohol')
class AlcoholController {
  constructor(@Inject(AlcoholService) alcoholService) {
    this.alcoholService = alcoholService;
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          const base = basename(file.originalname, ext);
          const filename = base + ext;
          callback(null, filename);
        },
      }),
    }),
  )
  @Post()
  create(
    @UploadedFile() file,
    @Body('volume', ParseFloatPipe) volume,
    @Body('durability', ParseFloatPipe) durability,
    @Body('cost', ParseFloatPipe) cost,
    @Body() createAlcoholDto,
  ) {
    if (file && volume && durability && cost) {
      createAlcoholDto.volume = volume;
      createAlcoholDto.durability = durability;
      createAlcoholDto.cost = cost;
      createAlcoholDto.file = file.path;
    }

    return this.alcoholService.create(createAlcoholDto);
  }

  @Get()
  findAll() {
    return this.alcoholService.findAll();
  }

  @Get('filter')
  findAlcoholByFilter(@Query() filterAlcoholDto) {
    return this.alcoholService.findAlcoholByFilter(filterAlcoholDto);
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.alcoholService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.alcoholService.remove(+id);
  }
}

module.exports = { AlcoholController };
