/* 
    Format:
    
    "Interval" : { ...Jobs }
*/

export default {
    "0 0 * * *": {
        checkSchedule: {
            priority: "high",
            action: (jobDefinition) => {
                console.log(jobDefinition);
            }
        }
    },
    "*/1 * * * *": {
        sendMail: {
            priority: "low",
            action: (jobDefinition) => {
                console.log("I've sent a mail")
            }
        },
        paySalary: {
            priority: "high",
            action: (jobDefinition) => {
                console.log("Salaries Paid")
            }
        }
    }
}