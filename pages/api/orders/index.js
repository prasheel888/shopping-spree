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

handler.post(async (req, res) => {
  await db.connect();
  const newOrder = new Order({
    ...req.body, //req.body does not contains the user who created this order so we have to pass user from the token in the req, we hae to use middleware
    user: req.user._id,
  });
  const order = await newOrder.save();
  res.status(201).send(order);
});

export default handler;
