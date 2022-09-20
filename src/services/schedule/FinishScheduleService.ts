import prismaCLient from "../../prisma/index";
interface FinishedRequest {
  schedule_id: string;
  user_id: string;
}

class FinishScheduleService {
  async execute({ schedule_id, user_id }: FinishedRequest) {
    if (schedule_id === "" || user_id === "") {
      throw new Error("Error.");
    }

    try {
      const belongToUser = await prismaCLient.service.findFirst({
        where: {
          id: schedule_id,
          user_id: user_id,
        },
      });

      if (!belongToUser) {
        throw new Error("Not authorized");
      }

      await prismaCLient.service.delete({
        where: {
          id: schedule_id,
        },
      });

      return { message: "Serviço deletado com sucesso!" };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

export { FinishScheduleService };
