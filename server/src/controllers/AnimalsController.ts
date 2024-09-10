import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import animalsRepository from '../repositories/animals.repository';
import genFileName from '../utils/genFileName';

class AnimalController {
    async getAll(req: Request, res: Response) {
        const response = await animalsRepository.getAllAnimals();

        res.status(response.code).json(response.data);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        const response = await animalsRepository.getAnimalById(Number(id));

        res.status(response.code).json(response.data);
    }

    async create(req: Request, res: Response) {
        const data = {
            ...req.body,
            image: req.file?.originalname
        };
        if (data.image) {
            data.image = genFileName(req.file!.originalname);
        }

        if (Object.keys(data).length === 0 || !data.name || !data.species || !data.status || !data.image)
            return res.status(400).json({ error: 'Invalid body request' });

        const response = await animalsRepository.createAnimal(data);

        if (response.code === 201) {
            //-----Salvar imagem na API
            if (data.image) {
                const imageBuffer = req.file!.buffer
                fs.writeFile(path.join(__dirname, '..', 'assets', 'images', 'animals', data.image), imageBuffer, (err) => {
                    if (err) {
                        console.log(err)
                        return res.status(response.code).json({ message: 'Aniaml added, but image was not saved' });
                    }
                });
            }

            return res.status(response.code).json(response.data);
        }

        return res.status(response.code).json(response.data);
    }

    async update(req: Request, res: Response) {
        const data = req.body;

        if (Object.keys(data).length === 0)
            return res.status(400).json({ error: 'Invalid body request' });

        const response = await animalsRepository.updateAnimal(data);

        return res.status(response.code).json(response.data);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const response = await animalsRepository.deleteAnimal(Number(id));

        return res.status(response.code).json(response.data);
    }
}

export default new AnimalController();