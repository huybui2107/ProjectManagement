'use strict';

const _ = require('lodash');
const getInfoData = ({ fileds = [], object = {} }) => {
    return _.pick(object, fileds)
}

// ['a' , 'b'] => { a : 1 , b : 1}
const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 1]));
}
const getUnSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 0]));
}

const removeUnderfinedObject = obj => {
    Object.keys(obj).forEach(k => {
        if (obj[k] == null) {
            delete obj[k];
        }
    })
    return obj;
}


const updateNestedObjectParser = object => {
    const final = {}
    // console.log(`1 ::`,object)
    Object.keys(object || {}).forEach(k => {
        if (typeof object[k] === 'object' && !Array.isArray(object[k])) {
            const reponse = updateNestedObjectParser(object[k])
            Object.keys(reponse || {}).forEach(a => {
                final[`${k}.${a}`] = reponse[a]
            })
        } else {
            final[k] = object[k];
        }
    })
    // console.log(`2 ::`,final)
    return final
}
const createTitleForSprint = (name, number) => {

    const words = name.split(' ');
    if (words.length === 1) {
        return `${words} Sprint ${number}`
    }
    let initials = "";

    for (const word of words) {
        initials = initials.concat(word[0].toString())

    }
    return `${initials} Sprint ${number}`
}
const createNuberForTask = (name, number) => {

    const words = name.split(' ');
    if (words.length === 1) {
        return `${words} ${number}`
    }
    let initials = "";

    for (const word of words) {
        initials = initials.concat(word[0].toString())

    }
    return `${initials} ${number}`
}

const lowerText = Text => {
    return Text.toLowerCase().charAt(0).toUpperCase() + Text.slice(1).toLowerCase()
}
const covertText = Text => {

    var regex = /\s/;

    if (regex.test(Text)) {
        const words = Text.split(' ')
        let initials = "";

        for (const word of words) {
            initials += lowerText(word) + " "
        }
        return initials;
    } else {
        return lowerText(Text)
    }

}

module.exports = {
    getInfoData,
    getSelectData,
    getUnSelectData,
    removeUnderfinedObject,
    updateNestedObjectParser,
    createTitleForSprint,
    createNuberForTask,
    covertText
}