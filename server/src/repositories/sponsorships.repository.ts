import Sponsorship from "../database/models/Sponsorship";
import { SponsorshipType } from "../utils/types";
import serverErrorHandler from "../utils/serverErrorHandler";
import animalsRepository from "./animals.repository";

export default {
    async getSponsorshipById(id: number): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar apadrinhamento na tabela
            const sponsorship = await Sponsorship.findOne({ where: { id } });

            if (sponsorship === null)
                return {
                    code: 404,
                    data: {
                        error: 'Sponsorship not found'
                    }
                };

            //-----Buscar animal na tabela
            const gettedAnimal = await animalsRepository.getAnimalById(sponsorship.dataValues.animal_id);

            if (gettedAnimal.code === 404)
                return gettedAnimal;

            
            return {
                code: 200,
                data: {
                    ...sponsorship.dataValues,
                    animal: gettedAnimal.data
                }
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async getAllSponsorships(): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar apadrinhamentos na tabela
            const sponsorship = await Sponsorship.findAll();

            if (sponsorship === null)
                return {
                    code: 404,
                    data: {
                        error: 'No sponsorships found'
                    }
                };

            return {
                code: 200,
                data: sponsorship
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async createSponsorship(data: SponsorshipType): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar animal na tabela
            const gettedAnimal = await animalsRepository.getAnimalById(data.animal_id);

            if (gettedAnimal.code === 404)
                return gettedAnimal;

            // -----Salvar apadrinhamento na tabela
            await Sponsorship.create({ ...data });

            return {
                code: 201
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async updateSponsorship({ id, data }: { id: number, data: SponsorshipType }): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar apadrinhamento na tabela
            const sponsorship = await Sponsorship.findOne({ where: { id } })
            
            if (sponsorship === null)
                return {
                    code: 404,
                    data: {
                        error: 'Sponsorship not found'
                    }
                };

            await sponsorship.update({ ...data });

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },
    
    async deleteSponsorship(id: number): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar apadrinhamento na tabela
            const sponsorship = await Sponsorship.findOne({ where: { id } });
            
            if (sponsorship === null)
                return {
                    code: 404,
                    data: {
                        error: 'Sponsorship not found'
                    }
                };
                
            await sponsorship.destroy();
            
            return {
                code: 200
            };
            
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    }
};