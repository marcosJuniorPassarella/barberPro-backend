import prismaCLient from "../prisma/index";
interface UserRequest {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!email) {
      throw new Error("Email incorrect");
    }
    // vefica se no banco de dados existe um email igual
    const userAlreadyExists = await prismaCLient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User/Email already exists");
    }
  }
}

export { CreateUserService };
