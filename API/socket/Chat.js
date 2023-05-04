var io = require("../server").io;
var OrderModel = require("../model/order");

io.of("/chat").on("connect", (socket) => {
  console.log("Socket Chat");
  console.log("A user ", socket.id, "Connected", io.engine.clientsCount);

  socket.on("send", async (msg) => {
    let order = await OrderModel.findById(msg.session_id);
    order.chat.push(msg.msg);
    await order.save();
    console.log(msg);
    io.of("/chat").emit("receive", msg);
  });

  const disconnected = () => {
    console.log("A user ", socket.id, "Connected", io.engine.clientsCount);
  };
  socket.on("disconnect", function () {
    // socket.removeListener("send", disconnected);
    console.log("Socket disconnected");
  });
});
