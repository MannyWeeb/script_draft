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
        fetchMail: {
            priority: "low",
            action: (jobDefinition) => {
                console.log("You've a mail")


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