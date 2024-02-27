import { sanitize } from "#util/sanitization.js";

const tests = ['   hello@', 'hi!', ' hello world !!!1    ', 'hi <script>console.log("hi")</script>'];

for(let i = 0; i < tests.length; i += 1) {
    const testLength = tests[i].length;
    const testResults = sanitize(tests[i]);
    const testResultsLength = testResults.length;

    console.log(tests[i], testLength, testResults, testResultsLength);
}