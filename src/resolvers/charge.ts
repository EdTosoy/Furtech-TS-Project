import { Mutation, Arg, Resolver, Ctx } from "type-graphql";
import Stripe from "stripe";
import { MyContext } from "src/MyContext";

@Resolver()
export class Charge {
  @Mutation(() => Boolean)
  async charge(
    @Arg("id") id: string,
    @Arg("amount") amount: number,
    @Ctx() { res }: MyContext
  ) {
    const stripe = new Stripe(
      "sk_test_51I0hdrLCnusGqFH6t7kgt9tSdgHR0mfoIrnPv4Ey4PeyoHNHwIjhA72eQNDZd8gYnEqT7ucdIzzUlqkFsjzMyMGx00phnxunYM",
      { apiVersion: "2020-08-27" }
    );
    try {
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Delicious empanadas",
        payment_method: id,
        confirm: true,
      });

      console.log(payment);
      return res.status(200).json({
        confirm: "abc123",
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
