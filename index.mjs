import neatCsv from "neat-csv";
import fs from "fs";
import { parse } from "json2csv";
import { v4 as uuidv4 } from "uuid";

fs.readFile("./af_content_type.csv", async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const readed = await neatCsv(data);

  console.log(readed[0]);

  // AppsFlyer_ID

  const result = readed.map((item) => {
    const { post_id, unique_id } = JSON.parse(item.Event_Value);

    return {
      user_id: item.AppsFlyer_ID,
      item_id: unique_id,
      event_type: item.Attributed_Touch_Type,
      event_value: post_id,
      timestamp: item.Attributed_Touch_Time,
    };
  });

  const fields = ["user_id", "item_id", "event_type", "event_value", "timestamp"];
  const opts = { fields };
  const csv = parse(result, opts);
  // console.log(csv)

  const filename = uuidv4() + ".csv";
  console.log(filename)

  fs.writeFile("./exports/" + filename, csv, function (err) {
    if (err) throw err;
    console.log("file saved");
  });
  return filename;
});
