import prismaCLient from "../../prisma/index";
interface HaircutRequest {
  user_id: string;
  haircut_id: string;
  name: string;
  price: number;
  status: boolean | string;
}

class UpdateHaircutService {
  async execute({
    user_id,
    haircut_id,
    name,
    price,
    status = true,
  }: HaircutRequest) {
    const haircut = await prismaCLient.haircut.update({
      where: {
        id: haircut_id,
      },
      data: {
        name: name,
        price: price,
        status: status === true ? true : false,
      },
    });

    return haircut;
  }
}

export { UpdateHaircutService };