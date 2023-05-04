var io = require("../server").io;
var WorkerModel = require("../model/worker");

io.of("/status").on("connect", (socket) => {
  console.log("Socket /status");
  console.log("A user ", socket.id, "Connected", io.engine.clientsCount);
  socket.on("online", async (msg) => {
    console.log(msg);
    let worker = await WorkerModel.status(msg.id, "online");
    let category = worker.category;
    console.log(category);
    worker = await WorkerModel.getAllWorkerByCategory(category);
    io.of("/status").emit("status-update", {
      result: worker,
      field: category,
    });
  });

  socket.on("offline", async (msg) => {
    console.log(msg);
    let worker = await WorkerModel.status(msg.id, "offline");

    let category = worker.category;
    console.log(category);
    worker = await WorkerModel.getAllWorkerByCategory(category);
    io.of("/status").emit("status-update", {
      result: worker,
      field: category,
    });
  });
});
