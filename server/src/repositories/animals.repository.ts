import Animal from "../database/models/Animal";
import { AnimalType } from "../types/types";
import serverErrorHandler from "../utils/serverErrorHandler";
import { Sponsorship } from "../database/models";

export default {
    async getAnimalById(id: number): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar animal na tabela
            const animal = await Animal.findByPk(id, {
                include: [ Sponsorship ]
            });

            if (animal === null)
                return {
                    code: 404,
                    data: {
                        error: 'Animal not found'
                    }
                };

            return {
                code: 200,
                data: animal.dataValues
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async getAllAnimals(): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar animais na tabela
            const animals = await Animal.findAll();

            return {
                code: 200,
                data: animals
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async createAnimal(data: AnimalType): Promise<{ code: number, data?: {} }> {
        try {
            // -----Salvar animal na tabela
            await Animal.create({ ...data });

            return {
                code: 201
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async updateAnimal(data: AnimalType): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar animal na tabela
            const animal = await Animal.findByPk(data.id)

            if (animal === null)
                return {
                    code: 404,
                    data: {
                        error: 'Animal not found'
                    }
                };

            delete data.id;
            await animal.update({ ...data });

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },
    
    async deleteAnimal(id: number): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar animal na tabela
            const animal = await Animal.findByPk(id);
            
            if (animal === null)
                return {
                    code: 404,
                    data: {
                        error: 'Animal not found'
                    }
                };
                
            await animal.destroy();
            
            return {
                code: 200
            };
            
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    }
};