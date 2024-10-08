import { Animal } from "../database/models";
import Adoption from "../database/models/Adoption";
import AdoptionsForm from "../database/models/AdoptionForm";
import { AdoptionFormType, AdoptionType } from "../types/types";
import serverErrorHandler from "../utils/serverErrorHandler";

export default {
    //-----Adoptions
    async getAdoptionById(id: number): Promise<{ code: number, data: {} }> {
        try {
            //-----Search adoption in the table
            const adoption = await Adoption.findByPk(id);

            if (adoption === null)
                return {
                    code: 404,
                    data: {
                        message: 'Adoption not found'
                    }
                };
            
            return {
                code: 200,
                data: adoption.dataValues
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async getAllAdoptions(): Promise<{ code: number, data: {} }> {
        try {
            //-----Search adoption in the table
            const adoption = await Adoption.findAll();

            return {
                code: 200,
                data: adoption
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async createAdoption(data: AdoptionType): Promise<{ code: number, data?: {} }> {
        try {
            //-----Search animal in the table
            const gettedAnimal = await Animal.findByPk(data.animal_id);

            if (gettedAnimal === null)
                return {
                    code: 404,
                    data: {
                        message: 'Animal not found'
                    }
                };

            const animal = gettedAnimal.dataValues;

            // -----Save adoption in the table
            await Adoption.create({
                ...data,
                animal_id: animal.id,
                animal_name: animal.name,
                image: animal.image,
                species: animal.species,
                race: animal.race,
                size: animal.size,
                color: animal.color,
                vacine: animal.vacine,
                castrated: animal.castrated,
                age: animal.age,
                gender: animal.gender,
                temperament: animal.temperament,
                status: 'Adotado',
                animal_observation: animal.observation,
                animal_created_at: animal.created_at,
            });
            await gettedAnimal.destroy();

            return {
                code: 201
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async updateAdoption(data: AdoptionType): Promise<{ code: number, data?: {} }> {
        try {
            //-----Search adoption in the table
            const adoption = await Adoption.findOne({ where: { animal_id: data.animal_id } })
            
            if (adoption === null)
                return {
                    code: 404,
                    data: {
                        message: 'Adoption not found'
                    }
                };

            const updatedData = { ...data };
            delete updatedData.animal_id;

            await adoption.update({ ...updatedData });

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },
    
    async deleteAdoption(id: number): Promise<{ code: number, data?: {} }> {
        try {
            //-----Search adoption in the table
            const adoption = await Adoption.findOne({ where: { id } });
            
            if (adoption === null)
                return {
                    code: 404,
                    data: {
                        message: 'Adoption not found'
                    }
                };
                
            await adoption.destroy();
            
            return {
                code: 200
            };
            
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    //-----Adoptions forms
    async getAllAdoptionsForms(): Promise<{ code: number, data: {} }> {
        try {
            //-----Search form in the table
            const adoptions = await AdoptionsForm.findAll();

            return {
                code: 200,
                data: adoptions
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async createAdoptionForm(data: AdoptionFormType): Promise<{ code: number, data?: {} }> {
        try {
            // -----Save form in the table
            await AdoptionsForm.create({ ...data });

            return {
                code: 201
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async acceptAdoptionForm(id: number): Promise<{ code: number, data?: {} }> {
        try {
            // -----Search form in the table
            const form = await AdoptionsForm.findByPk(id);
            
            if (!form)
                return {
                    code: 404,
                    data: {
                        message: 'Adoption form not found'
                    }
                }

            const adoption = { ...form.dataValues }
            delete adoption.id;
            
            const gettedAnimal = await Animal.findByPk(form.dataValues.animal_id);

            if (gettedAnimal === null)
                return {
                    code: 404,
                    data: {
                        message: 'Animal not found'
                    }
                };

            const animal = gettedAnimal.dataValues;

            const formData = { ...form.dataValues }
            delete formData.id;
            
            // -----Save adoption in the table
            await Adoption.create({
                ...formData,
                animal_id: animal.id,
                animal_name: animal.name,
                image: animal.image,
                species: animal.species,
                race: animal.race,
                size: animal.size,
                color: animal.color,
                vacine: animal.vacine,
                castrated: animal.castrated,
                age: animal.age,
                gender: animal.gender,
                temperament: animal.temperament,
                status: 'Adotado',
                animal_observation: animal.observation,
                animal_created_at: animal.created_at,
            });
            await gettedAnimal.destroy();
            await form.destroy();

            const allForms = await AdoptionsForm.findAll({ where: { animal_id: animal.id } });
            allForms.forEach(async formInDb => {
                await formInDb.destroy();
            })

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async denyAdoptionForm(id: number): Promise<{ code: number, data?: {} }> {
        try {
            // -----Search form in the table
            const form = await AdoptionsForm.findByPk(id);

            await form?.destroy();

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },
};