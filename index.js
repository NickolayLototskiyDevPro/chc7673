const ProjectModule = (function() {
    let instance;
    return {
        getInstance: function() {
            if (!instance) {
                instance = project;
            }
            return instance;
        }
    }
})();

const project = {
    participants: [],
    pricing: {},
    isBusy: false,
 
    init(participants, pricing) {

        if (participants !== undefined && pricing !== undefined) {
            this.participants = participants;
            this.pricing = pricing;
        }
    },
 
    findParticipant(functor, callbackFunction) {
        if (this.isBusy)return false;
        let context = this;
        context.isBusy = true;
		
        setTimeout(() => {
            const result = context.participants.find(functor);
            context.isBusy = false;
            callbackFunction(result || null);
    }, 10);
    },
 
    findParticipants(functor, callbackFunction) {
        if (this.isBusy)return false;
        let context = this;
        context.isBusy = true;
		
        setTimeout(() => {
            const result = context.participants.filter(functor);
            context.isBusy = false;
            callbackFunction(result);
    }, 10);
    },

	
    addParticipant(participantObject, callbackFunction) {

        if (this.isBusy)return false;
        let context = this;
        context.isBusy = true;

        setTimeout(() => {
            if (participantObject.seniorityLevel && typeof participantObject.seniorityLevel === "string") {
            context.participants.push(participantObject);
            context.isBusy = false;
            callbackFunction();
        } else {
            context.isBusy = false;
            callbackFunction(new Error('seniority not defined'));
        }
    }, 10);

    },

	
    removeParticipant(participantObject, callbackFunction) {
        if (this.isBusy)return false;
        let context = this;
        context.isBusy = true;

        setTimeout(() => {
            let result = (context.participants.includes(participantObject))
                ? context.participants.splice(context.participants.indexOf(participantObject), 1)[0]
                : null;
            context.isBusy = false;
            callbackFunction(result);
    }, 10);

    },

	
    setPricing(participantPriceObject, callbackFunction) {
        if (this.isBusy)return false;
        let context = this;
        context.isBusy = true;

        setTimeout(() => {
            context.pricing = Object.assign(context.pricing, participantPriceObject);
            context.isBusy = false;
            callbackFunction();

    }, 10);

    },
  
	
    calculateSalary(periodInDays) {
		if (this.isBusy)return false;
        let context = this;
        context.isBusy = true;
		
        let sum = context.participants.reduce(function (sum, participant) {

            let currentPrice = context.pricing[participant.seniorityLevel];
            if (currentPrice === undefined) throw new Error('pricing not set');
            return sum + currentPrice * periodInDays * 8;
			
        }, 0);


        context.isBusy = false;
        return sum;
    }
}


module.exports = {
    firstName: 'Oleksander',
    secondName: 'Myronov',
    task: ProjectModule.getInstance()
}
