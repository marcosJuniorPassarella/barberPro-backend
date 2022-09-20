import prismaCLient from "../../prisma/index";
interface HaircutRequest {
  user_id: string;
  status: boolean | string;
}

class ListHaircutService {
  async execute({ user_id, status }: HaircutRequest) {
    const haircut = await prismaCLient.haircut.findMany({
      where: {
        user_Id: user_id,
        status: status === "true" ? true : false,
      },
    });

    return haircut;
  }
}

export { ListHaircutService };
