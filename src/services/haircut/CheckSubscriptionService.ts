import prismaCLient from "../../prisma/index";
interface CheckSubscription {
  user_id: string;
}

class CheckSubscriptionService {
  async execute({ user_id }: CheckSubscription) {
    const status = await prismaCLient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        subscriptions: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });

    return status;
  }
}

export { CheckSubscriptionService };
