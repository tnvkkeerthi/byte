const { createInterface } = require("readline");
const { createReadStream } = require("fs");

function getChecksum(fileName, expectedChecksum) {

    const readStream = createReadStream(fileName);
    let checksum = 0;
    let diff;

    createInterface({ input: readStream })
        .on('line', (data) => {
            readStream.read()
            const row = data.split("\t");
            diff = Math.max.apply(Math, row) - Math.min.apply(Math, row);
            checksum = checksum + diff;
        })
        .on('close', () => {
            console.log("End of file");
            if (checksum === expectedChecksum) {
                console.log("Checksum is matching");
            }
            else {
                console.log(`Checksum is not matching : ${checksum}`);
            }
        })
}


const fileName = process.argv.slice(2)[0];
const expectedChecksum =  process.argv.slice(3)[0]

getChecksum(fileName || "01-general.tsv" , expectedChecksum || 32121);
