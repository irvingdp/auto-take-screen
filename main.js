const {Builder} = require('selenium-webdriver');
const fs = require('fs');
const {exec} = require("child_process");

const URL = 'https://www.google.com';
const COMMAND = '/bin/ls -la';

async function main() {
    let driver = new Builder()
        .forBrowser('chrome')
        .build();

    try {
        await driver.get(URL);
        let data = await driver.takeScreenshot();
        let base64Data = data.replace(/^data:image\/png;base64,/, "");
        fs.writeFile("screen_shot.png", base64Data, 'base64', function (err) {
            console.log("fs.writeFile", err);
            exec(COMMAND, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
        });
    } finally {
        await driver.quit();
    }

};

module.exports = main;

