export default class TestRunner {
    constructor(testId, test) {
        this.testId = testId;
        this.desc = test.description;
        this.run = test.run;
        this.status = 'Not Started Yet';
        this.statusAlias = 'not-started';
        this.rank = 3;
    }

    runTest(updateState) {
        this.run((status) => {
            this.updateTestStatus(status);
            updateState();
         });
        this.status = 'Running';
        this.statusAlias = 'running';
        this.rank = 2;
    }

    updateTestStatus(status) {
        if (status) {
            this.status = 'Passed';
            this.statusAlias = 'passed';
            this.rank = 1;
        } else {
            this.status = 'Failed';
            this.statusAlias = 'failed';
            this.rank = 0;
        }
    }
}
