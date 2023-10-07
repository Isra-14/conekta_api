module.exports = (serializer) => {
  serializer.register("conekta", {
    id: "id",
    whitelist: ["person"],
  });
};
