// region Helper functions(no need to touch)
function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    });
}

async function run(iterationNumber: number) {
    await sleep(2000 + (iterationNumber * 100));
    console.log(`Iteration #${iterationNumber}`);
}
// endregion

/**
 * Implement a runConcurrently that will run passed async function {totalRuns} times in {concurrency} "threads"
 * In other words you need to have a {concurrency} amount of slots that you use to run function and when one slot is free - you can add another run of function
 */
async function runConcurrently({ fn, concurrency, totalRuns }: { fn: (iterationNumber: number) => Promise<void>; concurrency: number; totalRuns: number; }) {

}


runConcurrently({ fn: run, concurrency: 5, totalRuns: 20 });