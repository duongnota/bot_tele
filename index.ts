const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api"); // Chuyển import thành require

const token = "7786882947:AAG3JzwvLWyhIx6XXYvPrZKrzx4IWKviOYM";
const botTele = new TelegramBot(token, { polling: true });

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/", (req: any, res: any) => {
     sendNotiCommit(req.body);
     res.status(200).send();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function sendNotiCommit(data: any) {
     // console.log("Sending notification to Telegram...");
     // console.log(data);
     try {
          let newData = {
               action: data.action,
               issue: data.issue.title,
               assigneeTo: data.issue.assignee.login,
               assigneeBy: data.issue.user.login,
          }
          botTele.sendMessage(
               "-1002397033518",
               'Acction: ' + newData.action + '\nIssue: ' + newData.issue + '\nAssignee to: ' + newData.assigneeTo + '\nAssignee by: ' + newData.assigneeBy
          );
     }
     catch {
          botTele.sendMessage(
               "-1002397033518",
               `has error on push + ${data.toString()}`
          );
     }
     return;
     let listCommit: any[] = [];

     data.commits.forEach((e: { committer: { email: string; }; message: any; }) => {
          let obj = {
               committer: e.committer.email.replace("@notavn.com", ""),
               commit: e.message,
          }
          listCommit.push(obj);
     });

     let msg = `Repo: ${data.repository.name}\nBranch: ${data.ref.replace("refs/heads/", "")}\n\n`;

     for (let i = 0; i < listCommit.length; i++) {
          msg += `* Commit: ${listCommit[i].commit}\n* By: ${listCommit[i].committer}\n\n`;
     }
     botTele.sendMessage(
          "-1002397033518",
          msg
     );
}