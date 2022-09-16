import { compare } from "bcryptjs";
import prismaCLient from "../../prisma/index";

interface AuthUserRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserRequest) {
    const user = await prismaCLient.user.findFirst({
      where: {
        email: email,
      },
      include: {
        subscriptions: true,
      },
    });

    if (!user) {
      throw new Error("Email/password incorrect");
    }

    const passwordMatch = await compare(password, user?.password);
    if (!passwordMatch) {
      throw new Error("Email/password incorrect");
    }

    // Gerar um token JWT

    return { ok: true };
  }
}

export { AuthUserService };
