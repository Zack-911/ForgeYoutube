module.exports = {
  name: "searchVideo",
  type: "messageCreate",
  code: `
  $onlyIf[$and[$message[0]!=;$message[1]!=]==true;give 2 arguments query and limit $searchVideo[query;limit?]]
  $searchVideo[$message[0];$message[1]]
  `
};
