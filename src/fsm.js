class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.initial = config.initial;
        this.state = config.initial;
        this.states = config.states;
        this.previous = null;
        this.forRedo = null;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state in this.states) {
            this.previous = this.state;
            this.state = state;
        } else throw new Er ("Error");
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        switch(event) {
            case 'study':
                if (this.state == 'normal') {
                    this.changeState('busy');
                } else throw new Er ("Error");
            break;
            case 'get_tired':
                if (this.state == 'busy') {
                    this.changeState('sleeping');
                } else throw new Er ("Error");
            break;
            case 'get_hungry':
                if ((this.state == 'busy') || (this.state == 'sleeping')) {
                    this.changeState('hungry');
                } else throw new Er ("Error");
            break;
            case 'eat':
                if (this.state == 'hungry') {
                    this.changeState('normal');
                } else throw new Er ("Error");
            break;
            case 'get_up':
                if (this.state == 'sleeping') {
                    this.changeState('normal');
                } else throw new Er ("Error");
            break;
            default: throw new Er ("Error");
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event == undefined) {
            return ['normal', 'busy', 'hungry', 'sleeping'];
        } else switch(event) {
            case 'study':
                return ['normal'];
            break;
            case 'get_tired':
                return ['busy'];
            break;
            case 'get_hungry':
                return ['busy', 'sleeping'];
            break;
            case 'eat':
                return ['hungry'];
            break;
            case 'get_up':
                return ['sleeping'];
            break;
            default: return [];
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.previous == null) {
            return false;
        } else {
            this.forRedo = this.state;
            this.state = this.previous;
            this.previous = null;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.forRedo == null) {
            return false;
        } else {
            if (this.state != this.forRedo) {
                this.state = this.forRedo;
                return true;
            } else return false;            
        }

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.previous = null;
        this.forRedo = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
