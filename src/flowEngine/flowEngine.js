import {ERROR_TYPES} from "./errorTypes";
import {logger} from "../logger/logger";

/**
 * Simple flow engine for processing rule sets
 */
class Engine {
    constructor(ruleSet, initialFlowId) {
        this.ruleSet = ruleSet;
        this.currentId = initialFlowId;
        this.visitedRules = {};
        this.visitedPath = [];
    }

    /**
     * Iterator over rule set. Iterator will iterate until error or success happened
     */
    execute() {
        let stepResult;

        logger.success('Start');

        do {
            stepResult = this.executeStep();
        } while (stepResult.next);

        if (stepResult.done) {
            logger.success('End.');
        }

        if (stepResult.error) {
            logger.error(stepResult.description);
        }

        return stepResult;
    }

    /**
     * Concrete iteration step with handling all possible errors
     */
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

    /**
     * Is rule was already executed
     */
    isRuleVisited(rule) {
        return this.visitedRules[rule.id] === true;
    }

    /**
     * Remember rule and calculate next rule id
     */
    visit(rule) {
        this.visitedRules[rule.id] = true;
        this.visitedPath.push(rule.id);

        const result = this.evaluateRule(rule);

        if (result) {
            this.currentId = rule.true_id;
            logger.success(`Rule ${rule.id} passed`);
        } else {
            this.currentId = rule.false_id;
            logger.warning(`Rule ${rule.id} failed`);
        }

        return this.currentId;
    }

    /**
     * Evaluate rule body
     */
    evaluateRule(rule) {
        const func = new Function('obj', rule.body);
        return func(this.ruleSet);
    }
}

/**
 * API for external consumers
 */
export function execute(ruleSet, initialFlowId) {
    return new Engine(ruleSet, initialFlowId).execute();
}
