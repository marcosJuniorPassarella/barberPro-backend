import prismaCLient from "../../prisma/index";
interface HaircutRequest {
  user_id: string;
  name: string;
  price: number;
}

class CreateHaircutService {
  async execute({ user_id, name, price }: HaircutRequest) {
    if (!name || !price) {
      throw new Error("Error");
    }

    const haircut = prismaCLient.haircut.create({
      data: {
        name: name,
        price: price,
        user_Id: user_id,
      },
    });

    return haircut;
  }
}

export { CreateHaircutService };
