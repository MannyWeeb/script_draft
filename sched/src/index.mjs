import jobData from "../jobs.mjs";
import config from "../config.json";
import { Agenda } from "agenda";
const agenda = new Agenda(config.agendaConfig);

const jobTable = Object.entries(jobData);

jobTable.forEach(([, jobs]) => {
    Object.entries(jobs).forEach(([name, { priority, action }]) => {
        agenda.define(name, { priority }, (job) => {
            if (config.logging) console.log(`Auto-Logger:[${name}] - [${new Date().toLocaleTimeString()}]`);
            action(job);
        });
    });
});

agenda.start()
    .catch(console.log)
    .then(() => {
        process.stdout.write("\u001b[2J\u001b[0;0H");
        console.log("Agenda Scheduler Daemon is now running in the background");

        let jobProc = [];
        jobTable.forEach(([schedule, jobs]) =>
            Object.entries(jobs).forEach(([name]) => {
                jobProc.push(agenda.every(schedule, name));
            })
        );
        Promise.all(jobProc)
            .catch((reason) => {
                console.log("Failed to schedule job requests...");
                console.log(reason);
            })
            .then(() => {
                console.log(`Jobs in memory:${jobProc.length}`);
            });
    });