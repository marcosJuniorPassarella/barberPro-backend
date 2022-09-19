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

    const myHaircuts = await prismaCLient.haircut.count({
      where: {
        user_Id: user_id,
      },
    });

    const user = await prismaCLient.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        subscriptions: true,
      },
    });

    if (myHaircuts >= 3 && user?.subscriptions?.status !== "active") {
      throw new Error("Not authorized");
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
