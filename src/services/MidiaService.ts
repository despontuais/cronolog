import { Prisma, Midia } from "@prisma/client";
import { prisma } from "../libs/prisma";
import { details, search as tmdbSearch } from "../controllers/tmdbController";

export const createMidia = async (req: Request, res: Response) => {

    const midia : Prisma.MidiaCreateInput = {
        Titulo: "",
        DT_Lancamento: "",
        ID_API: 1,
        Tipo: "Movie",
    }
}

export const searchMedia = async (title: string) => {
    return await prisma.midia.findFirst({where: {Titulo: title}});
}