export function timestamp_expires(secondes) {

    //Convert secondes to milliseconds
    const millisecondsToAdd = secondes * 1000;

    // Get the current timestamp
    const currentTimestamp = Date.now();

    // Add the milliseconds to the current timestamp and return the new timestamp
    return currentTimestamp + millisecondsToAdd;

}