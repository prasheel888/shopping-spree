import nc from "next-connect";
import Order from "../../../models/Order";
import { isAuth } from "../../../utils/auth";
import db from "../../../utils/db";

import { onError } from "../../../utils/error";

const handler = nc({
  onError,
});
//middleware

handler.use(isAuth); //isAuth middleware //only authenticated users will have access to this api

handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

export default handler;
