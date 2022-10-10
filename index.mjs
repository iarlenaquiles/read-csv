import neatCsv from 'neat-csv';
import fs from 'fs';

fs.readFile('./af_content_type.csv', async (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const readed = await neatCsv(data);

  console.log(readed)
})
