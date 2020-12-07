import { Query, Resolver } from "type-graphql";
import { CartList } from "../entity/CartList";

@Resolver()
export class Cartlist {
  @Query(() => [CartList], { nullable: true })
  async cartList(): Promise<CartList[] | null> {
    const cartlist = await CartList.find();
    if (!cartlist) {
      return null;
    }
    return cartlist;
  }
}
