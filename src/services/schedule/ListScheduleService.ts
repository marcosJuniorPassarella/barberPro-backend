import prismaCLient from "../../prisma/index";

interface ListScheduleRequest {
  user_id: string;
}

class ListScheduleService {
  async execute({ user_id }: ListScheduleRequest) {
    const schedule = await prismaCLient.service.findMany({
      where: {
        user_id: user_id,
      },
      select: {
        id: true,
        customer: true,
        haircut: true,
      },
    });
    return schedule;
  }
}

export { ListScheduleService };
