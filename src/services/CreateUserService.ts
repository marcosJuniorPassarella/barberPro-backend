import prismaCLient from "../prisma/index";
import { hash } from "bcryptjs";
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

    const passwordHash = await hash(password, 8);
    const user = await prismaCLient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
