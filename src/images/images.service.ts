import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Images } from './images.model';
import { v2 as cloudinary } from 'cloudinary'
import * as dotenv from "dotenv";
import { Sequelize } from 'sequelize-typescript';
const path = require('path');
dotenv.config({
    path: path.join(__dirname, '.development.env')
})



cloudinary.config({
    cloud_name: process.env.CI_NAME || 'dmttnqu9d',
    api_key: process.env.CI_KEY || '621627864841333',
    api_secret: process.env.CI_SECRECT || 'eMrKqVxumWYQOdI1-JtmdNaiMCs'
})

@Injectable()
export class ImagesService {
    constructor(@InjectModel(Images) private imageModel: typeof Images,
        private sequelize: Sequelize
    ) {

    }

    findOne(id: string): Promise<Images> {
        return this.imageModel.findOne({
            where: {
                isDeleted: 0,
                id
            }
        })
    }

    async create(file: any) {
        if (!file) {
            throw new BadRequestException("Thumbnail không được để trống")
        }
        try {
            return await this.sequelize.transaction(async t => {
                const transactionHost = { transaction: t };
                const upload = await this.uploadSingle(file.path)
                const image = await this.imageModel.create({
                    url: upload.secure_url,
                    public_id: upload.public_id
                }, transactionHost)
                return image.id
            })
        } catch (error) {

        }

    }

    uploadSingle(file: string): Promise<any> {
        return new Promise(async (res, rej) => {
            try {
                const data = await cloudinary.uploader.upload(file, {
                    folder: process.env.CI_FOLDER || 'images'
                })
                if (data) {
                    const { secure_url, public_id } = data
                    return res({
                        secure_url,
                        public_id
                    })
                }
                return rej(null)
            } catch (error) {
                console.log(error);
                return rej(null)
            }
        })
    }

    async delete(id: string) {
        const post = await this.findOne(id)

        if (!post) {
            throw new BadRequestException("Thumbnail không được tìm thấy")
        }

        return this.imageModel.update({
            isDelete: 1
        }, {
            where: {
                id
            }
        })

    }

    removeFile(path: string) {

    }
}
