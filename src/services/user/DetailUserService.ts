import prismaCLient from "../../prisma/index";

class UserDetailService {
  async execute(user_id: string) {
    const user = await prismaCLient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        endereco: true,
        subscriptions: {
          select: {
            id: true,
            priceId: true,
            status: true,
          },
        },
      },
    });
    return user;
  }
}

export { UserDetailService };
