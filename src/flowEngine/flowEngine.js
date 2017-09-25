import {ERROR_TYPES} from "./errorTypes";

class Engine {
    constructor(ruleSet, initialFlowId) {
        this.ruleSet = ruleSet;
        this.currentId = initialFlowId;
        this.visitedRules = {};
        this.visitedPath = [];
    }

    execute() {
        let stepResult;

        do {
            stepResult = this.executeStep();
        } while (stepResult.next);

        return stepResult;
    }

    executeStep() {
        const rule = this.ruleSet[this.currentId];
        if (rule === undefined) {
            return {
                error: true,
                description: `Rule(#${this.currentId}) not found. Please provide correct config`,
                type: ERROR_TYPES.RULE_SET,
                rule
            };
        }

        if (this.isRuleVisited(rule)) {
            return {
                error: true,
                description: `Found circular dependencies on rule(#${rule.id}).`,
                type: ERROR_TYPES.CIRCULAR,
                rule
            }
        }

        try {
            const nextId = this.visit(rule);
            return nextId === null
                ? {done: true}
                : {next: true};
        } catch (e) {
            return {
                error: true,
                description: `Handled error during execution rule(#${rule.id}) body`,
                type: ERROR_TYPES.RULE_SET,
                rule
            }
        }
    }

    isRuleVisited(rule) {
        return this.visitedRules[rule.id] === true;
    }

    visit(rule) {
        this.visitedRules[rule.id] = true;
        this.visitedPath.push(rule.id);

        this.currentId = this.evaluateRule(rule)
            ? rule.true_id
            : rule.false_id;

        return this.currentId;
    }

    evaluateRule(rule) {
        const func = new Function('obj', rule.body);
        return func(this.ruleSet);
    }
}

export function execute(ruleSet, initialFlowId) {
    return new Engine(ruleSet, initialFlowId).execute();
}
