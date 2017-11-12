//Реализовать объект который будет описывать финансовый учет на проекте.
/* participantObject EXAMPLE */
/* Example: { firstName: 'Sergey', lastName: 'Zotenko', seniorityLevel: 'intermediate' } */
// const participantObject = {
// firstName: string,
// lastName: string,
// seniorityLevel: string
// }
/* pricingObject EXAMPLE */
/* Example: { 'junior': 10 } */
// const pricingObject = {
// roleName: number
// }
const project = {
    participants: [],
    pricing: {},
    isBusy: false,
    /* implement initialization of the object */
    /* participants - predefined array of participants */
    /* pricing - predefined object (keyvalue collection) of pricing */
    init(participants, pricing) {

        if (participants !== undefined && pricing !== undefined) {
            this.participants = participants;
            this.pricing = pricing;
        }
    },
    /* pass found participant into callback, stops on first match */
    /* functor - function that will be executed for elements of participants array */
    /* callbackFunction - function that will be executed with found participant as argument or with
     null if not */
    /* callbackFunction (participant) => {} */
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
    /* pass array of found participants into callback */
    /* functor - function that will be executed for elements of participants array */
    /* callbackFunction - function that will be executed with array of found participants as
     argument or empty array if not */
    /* callbackFunction (participantsArray) => {} */
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
    /* push new participant into this.participants array */
    /* callbackFunction - function that will be executed when job will be done */
    /* (err) => {} */
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
    /* push new participant into this.participants array */
    /* callback should receive removed participant */
    /* callbackFunction - function that will be executed with object of removed participant or null if
     participant wasn't found when job will be done */
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
    /* Extends this.pricing with new field or change existing */
    /* callbackFunction - function that will be executed when job will be done, doesn't take any
     arguments */
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
    /* calculates salary of all participants in the given period */
    /* periodInDays, has type number, one day is equal 8 working hours */
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
// Все методы которые содержат callbackFunction в списке аргументов должны выполнять
// свою работу в setTimeout и возвращать значение в данный коллбек.
// Все методы которые содержат callbackFunction в списке аргументов должны
// устанавливать isBusy в значение true когда начинают работу
// и в значение false когда заканчивают работу.
// Если isBusy установлено в true метод не должен выполнять какую либо работу и сразу же
// вернуть false.
// Объект project должен быть реализован как синглтон.
// !!! Я ожидаю что Вы запушите файл index.js в корень предоставленного репозитория в
// следующем виде
/* реализация */


module.exports = {
    firstName: 'Oleksander',
    secondName: 'Myronov',
    task: project
}
//Где ProjectModule это объект с методом getInstance()