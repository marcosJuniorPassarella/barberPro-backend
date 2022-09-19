import prismaCLient from "../../prisma/index";

interface UserRequest {
  user_id: string;
  name: string;
  endereco: string;
}

class UpdateUserService {
  async execute({ user_id, name, endereco }: UserRequest) {
    try {
      const userAlreadyExists = await prismaCLient.user.findFirst({
        where: {
          id: user_id,
        },
      });

      if (!userAlreadyExists) {
        throw new Error("User not exists!");
      }

      const userUpdated = await prismaCLient.user.update({
        where: {
          id: user_id,
        },
        data: {
          name,
          endereco,
        },
        select: {
          name: true,
          email: true,
          endereco: true,
        },
      });

      return userUpdated;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
