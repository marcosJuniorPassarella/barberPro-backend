import prismaCLient from "../../prisma/index";
interface CountRequest {
  user_id: string;
}

class CountHaircutService {
  async execute({ user_id }: CountRequest) {
    const count = await prismaCLient.haircut.count({
      where: {
        user_Id: user_id,
      },
    });
    return count;
  }
}

export { CountHaircutService };
