import prismaCLient from "../../prisma/index";

interface AuthUserRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserRequest) {
    console.log(email, password);
    return { ok: true };
  }
}

export { AuthUserService };
