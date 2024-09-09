import { Op } from "sequelize";
import bcrypt from "bcrypt";
import Admin from "../database/models/Admin";
import { AdminType } from "../utils/types";
import serverErrorHandler from "../utils/serverErrorHandler";

export default {
    async getAdminById(id: number): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar administrador na tabela
            const gettedAdmin = await Admin.findOne({ where: { id } });

            if (gettedAdmin === null)
                return {
                    code: 404,
                    data: {
                        error: 'Administrator not found'
                    }
                };

            return {
                code: 200,
                data: {
                    user: {
                        name: gettedAdmin.dataValues.name,
                        email: gettedAdmin.dataValues.email,
                        phone: gettedAdmin.dataValues.phone,
                        role: gettedAdmin.dataValues.role
                    }
                }
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async getAllAdmins(): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar administradores na tabela
            const admins = await Admin.findAll();

            if (admins === null)
                return {
                    code: 404,
                    data: {
                        error: 'No administrator found'
                    }
                };

            return {
                code: 200,
                data: admins.map(user => {
                    return {
                        id: user.dataValues.id,
                        user: user.dataValues.name,
                        email: user.dataValues.email,
                        phone: user.dataValues.phone,
                        role: user.dataValues.role
                    };
                })
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async login({ user, password }: { user: string, password: string }): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar administrador na tabela
            const gettedAdmin = await Admin.findOne({
                where: {
                  [Op.or]: [
                    { email: user },
                    { phone: user }
                  ]
                }
            });

            if (gettedAdmin === null)
                return {
                    code: 404,
                    data: {
                        error: 'Administrator not found'
                    }
                };

            return {
                code: 200,
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async createAdmin(data: AdminType): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar administrador na tabela
            const adminExistis = await Admin.findOne({
                where: {
                  [Op.or]: [
                    { email: data.email },
                    { phone: data.phone }
                  ]
                }
            });

            if (adminExistis !== null)
                return {
                    code: 409,
                    data: {
                        error: 'Email or phone already registered'
                    }
                };

            const userData = data;
            const salt = await bcrypt.genSalt(12);
            userData.password = await bcrypt.hash(userData.password, salt);

            console.log(userData)
            // -----Salvar administrador na tabela
            // await Admin.create({ ...data });

            return {
                code: 201
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async updateAdmin({ id, data }: { id: number, data: AdminType }): Promise<{ code: number, data?: {} }> {
        try {
            const adminExistis = await Admin.findOne({
                where: {
                  [Op.or]: [
                    { email: data.email },
                    { phone: data.phone }
                  ]
                }
            });

            if (adminExistis !== null)
                return {
                    code: 409,
                    data: {
                        error: 'Email or phone already registered'
                    }
                };

            //-----Buscar administrador na tabela
            const gettedAdmin = await Admin.findOne({ where: { id } })
            
            if (gettedAdmin === null)
                return {
                    code: 404,
                    data: {
                        error: 'Administrator not found'
                    }
                };

            await gettedAdmin.update({ ...data });

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },
    
    async deleteAdmin(id: number): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar administrador na tabela
            const gettedAdmin = await Admin.findOne({ where: { id } });
            
            if (gettedAdmin === null)
                return {
                    code: 404,
                    data: {
                        error: 'Administrator not found'
                    }
                };
                
            await gettedAdmin.destroy();
            
            return {
                code: 200
            };
            
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    }
};