import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { CartList } from "../entity/CartList";

@Resolver()
export class AddToCart {
  @Mutation(() => Boolean)
  async addToCart(
    @Arg("name") name: string,
    @Arg("url") url: string,
    @Arg("price") price: string,
    @Arg("username") username: string
  ) {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      throw new Error("error");
    }
    try {
      await CartList.insert({
        name,
        price,
        url,
      });
     
      console.log(CartList);
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
}
